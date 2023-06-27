const express = require('express');
const { getLoanTable, loanTable } = require('../controllers/loan-controllers');
// const { loanTable } = require("../controllers/loan-controllers")

const router = express.Router();

// router.get("/loan-performance-table", loanTable);
router.get("/loan-table", getLoanTable)
router.post("/create-loan", loanTable)

module.exports = router