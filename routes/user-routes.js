const express = require('express');
const { signup, login, verifyToken, getUser, refreshToken, forgotPassword } = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('refresh', refreshToken, verifyToken, getUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", isAuth, signOut);

module.exports = router
