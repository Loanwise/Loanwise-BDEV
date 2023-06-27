const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer_id: String,
  name: String,
  address: String,
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
  no_of_open_credit_line: Number,
  credit_utilization_rate: Number,
  no_of_mortgage_account: Number,
  employment_status__1: String,
  credit_score: Number,
  requested: Number,
  disbursed: Number,
  loan_duration: String,
  repayment_method: String,
  interest_rate: Number,
  due_date: String,
  loan_status_2: String,
  late_fee: Number,
  refunded: Boolean,
  default_category: String,
  first_repayment: String,
  second_repayment: String,
  loan_receive: Number,
  loan_reviewed: Boolean,
  loan_disbursed: Boolean
});

const Loan = mongoose.model('LoanTable', loanSchema);

module.exports = Loan;