const express = require('express');
const mongoose = require('mongoose')
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

require('dotenv').config();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

// ...rest of your code...


// ...other middleware and routes...

// Register the error handling middleware
app.use(errorHandler);

// ...start the server...
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

