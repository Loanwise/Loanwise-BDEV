const express = require('express');
const bodyParser = require('express').json;
require('./config/database');

const app = express();
const port = 4000;

const userRouter = require('./routes/user')

app.use(bodyParser());

app.use('/user', userRouter);

app.listen(port, () => console.log(`Server running at port: ${port}`));