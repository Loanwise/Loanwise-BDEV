const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes')

const app = express();
app.use(express.json());
app.use('/api', router) 
mongoose
    .connect("mongodb+srv://admin:Password123@loanwise.qnhvgxw.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        app.listen(4000)
        console.log("Database is connected!, Listening to localhost 4000")
    }).catch((err) => console.log(err));

