const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const user = require('../model/user');

router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Enter your Email and Password"
        })
    } else {
        user.find({email})
        .then(data => {
            if (data) {
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then (result => {
                    if (result) {
                        res.json({
                            status: "SUCCESS",
                            message: "Sign-in Successful",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Incorrect Password"
                        })
                    }
                })
                .catch(err => {
                    res.json ({
                    status: "FAILED",
                    message: "An error occured while fetching your data"
                    })
                })
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credential entered"
                })
            }
        })
        .catch (err => {
            res.json({
                status: "FAILED",
                message: "User does not exist"
            })
        })
    }
});

module.exports = router