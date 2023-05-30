const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = ("JDBFEIUBndfbjfbhdbweb23urhwnr9wcj");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passwordReset = require('./../models/passwordReset');
const user = require("../models/passwordReset");


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Ready for messages');
        console.log(success);
    }
});


router.post("/requestPasswordReset", (req, res) => {
    const {email, redirectUrl} = req.body;

    user
    .find({email})
    .then((data) => {
        if (data.length) {
            if (!data[0].verified) {
                res.json({
                    status: 'FAILED',
                    message: "Email is yet to be verified."
                })
            } else {
                sendResetEmail(data[0], redirecturl, res);
            }
        } 
        else {
            res.json({
                status: 'FAILED',
                message: "Unable to fetch user data"
            })
        }
    })
    .catch(Error => {
        console.log(Error)
        res.json({
            status: 'FAILED',
            message: "The user does not exist"
        })
    })
})


const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = jwt + _id;

    passwordReset
    .deleteMany({ userid: _id})
    .then(result => {

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Reset your Password",
            html: `<p>Reset your password by clicking on the link sent to this mail, for you to be able to login to your account.</p><p>This link <b>expires in 60 minute</b>.</p><p>Press <a href=${ redirectUrl + "/" + _id + "/" + resetString } here</a> to proceed.</p>`
        }

        const saltRounds = 15;
        bcrypt
        .hash(resetString, saltRounds)
        .then(hashedResetString => {

            const newPasswordReset = new passwordReset({
                userId: _id,
                resetString: hashedResetString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            })

            newPasswordReset
            .save()
            .then(() => {
                transporter
                .sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error:', error);
                    }
                    else {
                        console.log('Email sent:', info.response);
                    }
                })
                .then(() => {
                    res.json({
                        status: 'PENDING',
                        message: 'Password Reset Email Sent',
                    })
                })
                .catch(Error => {
                    console.log(Error);
                    res.json({
                        status: 'FAILED',
                        message: "Password reset email failed"
                    })
                })
            })
            .catch(Error => {
                console.log(Error);
                res.json({
                    status: 'FAILED',
                    message: "Unable to save your password"
                })
            })
        })
        .catch(Error => {
            console.log(Error);
            res.json({
                status: 'FAILED',
                message: "An error occured",
            })
        })
    })
    .catch(Error => {
        console.log(Error)
        res.json({
            status: 'FAILED',
            message: "Clearing existing password failed"
        })
    })
}

module.exports = router;