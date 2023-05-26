require('dotenv').config();
const mongoose = require('mongoose');


mongoose
    .connect("mongodb+srv://admin:Password123@loanwise.qnhvgxw.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MongoDB connected!")
    }).catch((err) => console.log(err));