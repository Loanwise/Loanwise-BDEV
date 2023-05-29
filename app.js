const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user');


const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', router)

mongoose
.connect("mongodb+srv://admin:Password123@loanwise.qnhvgxw.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(() => console.log('Database is connected'));
})
.catch((Error) => {
    console.log(Error);
})

app.listen(port, () => console.log(`Server running at port: ${port}`));


