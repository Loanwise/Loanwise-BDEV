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
    required: true,
  },
  alternativeEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  bvn: {
    type: String,
    required: true,
  },
  employmentData: {
    currentEmployer: {
      type: String,
    },
    currentRole: {
      type: String,
    },
    annualIncome: {
      type: Number,
    },
    totalYearsOfEmployment: {
      type: Number,
    },
    incomeDebitRatio: {
      type: Number,
    },
    openCreditLines: {
      type: Number,
    },
    creditUtilizationRate: {
      type: Number,
    },
    mortgageAccounts: {
      type: Number,
    },
  },
  loanData: {
    loanPurpose: {
      type: String,
    },
    loanTerm: {
      type: String,
    },
    requestedAmount: {
      type: Number,
    },
    loanCompanyVerification: {
      type: Boolean,
    },
    applicationType: {
      type: String,
    },
  },
});

const Loan = mongoose.model('LoanTable', loanSchema);

module.exports = Loan;