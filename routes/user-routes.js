const express = require('express');
const { borrowers_details } = require('../controllers/borrower-controller');
const { signup, login, verifyToken, getUser, refreshToken, forgetPassword, resetPassword } = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('refresh', refreshToken, verifyToken, getUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/borrowers-analysis", borrowers_details)
// borrower

module.exports = router
