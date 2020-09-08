const UserModel = require("../models/user.model");
const passport = require("passport");

const userController = {};

userController.renderIndex = (req, res) => {
    res.render("index");
}

userController.renderLogin = (req, res) => {
    res.render("login");
}

userController.renderRegister = (req, res) => {
    res.render("register");
}

userController.renderProfile = (req, res) => {
    res.render("profile");
}

userController.register = async (req, res) => {
    const { username, name, lastname, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (user) {
            req.flash("messageErrors", "User already exist");
            return res.redirect("/register");
        } else {
            const newUser = new UserModel({
                username,
                name,
                lastname,
                email
            });

            newUser.password = await newUser.encryptPassword(password);

            await newUser.save();

            req.flash("messageSuccess", "User created successfully");
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
}

userController.login = passport.authenticate('local', {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
});

userController.logout = (req, res) => {
    req.logout();
    res.redirect("/login");
}

module.exports = userController;