const express = require('express');
const { loanTable } = require("../controllers/loan-controllers")

const router = express.Router();

router.get("/loan-performance-table", loanTable);

module.exports = router