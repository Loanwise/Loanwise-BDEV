const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  alternativeEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  dateOfBirth: {
    type: Date,
    // required: true,
  },
  bvn: {
    type: String,
    // required: true,
  },
  employmentData: {
    currentEmployer: {
      type: String,
    },
    currentRole: {
      type: String,
    },
    Annual_Income: {
      type: Number,
    },
    Total_Years_of_Employment: {
      type: Number,
    },
    Income_Debt_Ratio: {
      type: Number,
    },
    No_of_Open_Credit_Lines: {
      type: Number,
    },
    Credit_Utilization_Rate: {
      type: Number,
    },
    No_of_Mortgage_Account: {
      type: Number,
    },
    Loan_Purpose: {
      type: String,
    },
    Loan_Term: {
      type: String,
    },
    requestedAmount: {
      type: Number,
    },
    Verification_by_Loan_Company: {
      type: Boolean,
    },
    Application_Type: {
      type: String,
    },
  },
});

const Loan = mongoose.model('LoanTable', loanSchema);

module.exports = Loan;