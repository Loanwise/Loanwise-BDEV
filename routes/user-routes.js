const express = require('express');
const { signup, login, verifyToken, getUser, refreshToken, forgetPassword, resetPassword, verifySignup, recoveryAccount } = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-signup", verifySignup)
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('refresh', refreshToken, verifyToken, getUser);
router.post("/forget-password", forgetPassword);
router.post("/recovery-account", recoveryAccount)
router.post("/reset-password", resetPassword)


// verify Token 

module.exports = router
