const { Router } = require("express");
const router = Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const {
    renderIndex,
    renderLogin,
    renderRegister,
    renderProfile,
    register,
    login,
    logout
} = require("../controllers/user.controller.js");

router.get("/", renderIndex);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/profile", isAuthenticated, renderProfile);
router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);

module.exports = router

