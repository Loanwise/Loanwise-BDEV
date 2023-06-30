const fs = require('fs');

const loanTable = async (req, res, next) => {
    fs.readFile(__dirname + "/" + "csvjson.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Internal Server Error 2');
        }
    });
};


exports.loanTable = loanTable;