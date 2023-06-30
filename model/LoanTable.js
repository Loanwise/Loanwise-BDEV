const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer_id: String,
  name: String,
  Address: String,
  email: String,
  phone_number: String,
  employment_status: String,
  loan_term: String,
  verification_by_loan_company: String,
  loan_status: String,
  loan_purpose: String,
  application_type: String,
  total_years_of_employment: String,
  annual_income: Number,
  income_debt_ratio: Number,
  no_of_openCreditLine: Number,
  credit_utilization_rate: Number,
  no_of_mortgageAccount: Number,
  employment_status__1: String,
  credit_score: Number,
  Requested: Number,
  Disbursed: Number,
  loan_duration: String,
  repayment_method: String,
  interest_rate: Number,
  due_date: String,
  loan_status: String,
  loan_status_2: String,
  late_fee: Number,
  Refunded: String,
  Default: String,
  Category: String,
  first_repayment: String,
  second_repayment: String,
  loan_received: String,
  loan_reviewed: String,
  loan_disbursed: String
});

const Loan = mongoose.model('LoanTable', loanSchema);

module.exports = Loan;