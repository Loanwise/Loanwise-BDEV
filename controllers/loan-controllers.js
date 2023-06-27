const fs = require('fs');
const Loan = require('../model/LoanTable');

const saveLoanToDatabase = (loanData) => {
  const loan = new Loan(loanData);
  return loan.save();
};

const loanTable = async (req, res, next) => {
  fs.readFile(__dirname + '/' + 'csvjson.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    
    try {
      const jsonData = JSON.parse(data);
      saveLoanToDatabase(jsonData)
        .then(() => {
          res.json(jsonData);
        })
        .catch((error) => {
          console.error('Error saving loan to the database:', error);
          return res.status(500).send('Internal Server Error');
        });
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('Internal Server Error');
    }
  });
};

const getLoanTable = (req, res, next) => {
  Loan.find({})
    .then((loans) => {
      res.json(loans);
    })
    .catch((error) => {
      console.error('Error retrieving loan data from the database:', error);
      return res.status(500).send('Internal Server Error');
    });
};

module.exports = {
  loanTable,
  getLoanTable
};
