const express = require('express');
const { borrowers_details } = require('../controllers/borrower-controller');
const { signup, login, verifyToken, getUser, refreshToken, forgetPassword, resetPassword } = require("../controllers/user-controller");
const { getNotification, updateNotification } = require("../controllers/notification-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('refresh', refreshToken, verifyToken, getUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/borrowers-analysis", borrowers_details)
router.get("/settings/notification/:id", getNotification);
router.put("/settings/notification/:id", updateNotification);
// borrower

module.exports = router
