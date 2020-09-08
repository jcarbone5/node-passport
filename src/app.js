const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//Initializations
const app = express();
require("./middlewares/passport");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(app.get("views"), "partials"),
    layoutsDir: path.join(app.get("views"), "layouts"),
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set("view engine", ".hbs")

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: "node-passport-secret",
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    app.locals.messageSuccess = req.flash("messageSuccess");
    app.locals.messageErrors = req.flash("messageErrors"); 
    app.locals.user = req.user; 

    next();
});

//Routes
app.use(require("./routes/user.routes"));

module.exports = app;