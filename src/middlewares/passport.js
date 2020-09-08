const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserModel = require("../models/user.model");

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        const user = await UserModel.findOne({ email });

        if(!user){
            return done(false, null, req.flash("messageErrors", "User not found"));
        }

        const comparePassword = await user.decryptPassword(password);
        if(!comparePassword) {
            return done(false, null, req.flash("messageErrors", "Incorrect password"));   
        }

        return done(false, user, req.flash("messageSuccess", "Logged in user"));
}));

passport.serializeUser((user, done) => {
    done(null, user._id); 
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});