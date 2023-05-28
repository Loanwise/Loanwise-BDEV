const express = require('express');
const router = require('./routes/user')


const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => console.log(`Server running at port: ${port}`));