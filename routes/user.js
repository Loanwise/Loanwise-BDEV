const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const passwordReset = require('./../models/passwordReset');
const user = require("../models/passwordReset");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});


router.post('/requestPasswordReset', (req, res) => {
    const {email, redirectUrl} = req.body;

    user
    .find({email})
    .then(((data) => {
        if (data.length) {
            if (!data[0].verified) {
                res.json({
                    status: 'FAILED',
                    message: "Email is yet to be verified."
                })
            } else {
                sendResetEmail(data[0], redirecturl, res);
            }
        } else {
            res.json({
                status: 'FAILED',
                message: "Unable to fetch user data"
            })
        }
    }))
    .catch(error => {
        console.log(Error)
        res.json({
            status: 'FAILED',
            message: "The user does not exist"
        })
    })
})


const sendResetEmail = ({_id, email}, redirecturl, res) => {
    const resetString = _id

    passwordReset
    .deleteMany({ userid: _id})
    .then(result => {
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Reset your Password",
            html: `<p>Reset your password by linking on the link sent to this mail, so you can be able to login to your account.</p><p>This link <b>expires in 60 minute</b>.</p><p>Press <a href=${redirecturl + "/" + _id} here</a> to proceed.</p>`
        }

        const saltRounds = 15;
        bcrypt
        .hash(resetString, saltRounds)
        .then(hashResetString => {
            const newPasswordReset = new passwordReset({
                userId: _id,
                resetString: hashResetString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            })

            newPasswordReset.save()
            .then(() => {
                transporter
                .sendMail(mailOptions)
                .then(() => {
                    res.json({
                        status: 'PENDING',
                        message: 'Password Reset Email Sent',
                    })
                })
                .catch(error => {
                    console.log(Error);
                    res.json({
                        status: 'FAILED',
                        message: "Password reset email failed"
                    })
                })
            })
            .catch(error => {
                console.log(Error);
                res.json({
                    status: 'FAILED',
                    message: "Unable to save your password"
                })
            })
        })
        .catch(error => {
            console.log(Error);
            res.json({
                status: 'FAILED',
                message: "An error occured",
            })
        })
    })
    .catch(error => {
        console.log(Error)
        res.json({
            status: 'FAILED',
            message: "Clearing existing password failed"
        })
    })
}

module.exports = router;