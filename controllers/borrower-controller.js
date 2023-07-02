const Borrow = require('../model/LoanTable');

let borrowers = []; // Array to store borrower details

const getNextcustomer_id = () => {
  const existingIds = borrowers.map((borrower) => borrower.customer_id);
  let customer_id = 1;
  while (existingIds.includes(`CST_${customer_id}`)) {
    customer_id++;
  }
  return `CST_${customer_id}`;
};

const borrowers_details = async (req, res) => {
  const { fullName, address, email, alternativeEmail, phoneNumber, dateOfBirth, bvn } = req.body;

  try {
    const existingBorrower = await Borrow.findOne({ email });
    if (existingBorrower) {
      return res.status(400).json({ message: "Borrower already exists" });
    }

    const customer_id = getNextcustomer_id();

    const borrower = {
      customer_id,
      fullName,
      address,
      email,
      alternativeEmail,
      phoneNumber,
      dateOfBirth,
      bvn,
      employmentData: {},
      loanData: {},
    };

    borrowers.push(borrower);

    return res.status(201).json({ message: borrower });
  } catch (error) {
    console.error('Error storing borrower details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const saveEmploymentData = async (req, res) => {
  const { customer_id, currentEmployer, currentRole, annualIncome, totalYearsOfEmployment, incomeDebitRatio, openCreditLines, creditUtilizationRate, mortgageAccounts, loanPurpose, loanTerm, requestedAmount, loanCompanyVerification, applicationType } = req.body;

  try {
    const borrower = borrowers.find((borrower) => borrower.customer_id === customer_id);
    if (!borrower) {
      return res.status(404).json({ message: 'Borrower not found' });
    }

    borrower.employmentData = {
      currentEmployer,
      currentRole,
      annualIncome,
      totalYearsOfEmployment,
      incomeDebitRatio,
      openCreditLines,
      creditUtilizationRate,
      mortgageAccounts,
    };

    borrower.loanData = {
      loanPurpose,
      loanTerm,
      requestedAmount,
      loanCompanyVerification,
      applicationType,
    };

    // Save the borrower to the database using the Borrow model
    const borrow = new Borrow(borrower);
    await borrow.save();

    return res.status(200).json({ message: 'Employment data saved successfully' });
  } catch (error) {
    console.error('Error saving employment data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  borrowers_details,
  saveEmploymentData,
};
