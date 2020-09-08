const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("messageErrors", "Unauthorized access");
        res.redirect("/login");
    }
}

module.exports = isAuthenticated;