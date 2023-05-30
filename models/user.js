const express = require('express');
const { passwordReset } = require("../model/passwordReset");

const router = express.Router();

router.post("/passwordReset", passwordReset);

module.exports = router;