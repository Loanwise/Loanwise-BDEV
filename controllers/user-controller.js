const User = require("../model/User");
const PasswordReset = require("../model/PasswordSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT_SECRET_KEY = "JDBFEIUBndfbjfbhdbweb23urhwnr9wcj";
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'loanwise50@gmail.com',
        pass: 'rkhicdwjnlayqfkp',
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




const signup = async (req, res, next) => {
    const {name,email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }catch (err){
        console.log(err)
    }
    if (existingUser){
        return res.status(400).json({message : "User already exists! Please login"})
    }

    const hashedPassword = bcrypt.hashSync(password, 15);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try{
        await user.save();
    } catch (err){
        console.log(err)
    }

    return res.status(201).json({message:user})
}

const login = async (req,res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({ email: email});
    }catch (err){
        return new Error(err);
    }
    if (!existingUser){
        return res.status(400).json({message: "User not found. Please signup"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: 'Invalid Email/Password'});
    }
    const token = jwt.sign({id: existingUser._id},JWT_SECRET_KEY,{
        expiresIn: "35s"})

    console.log("Generated Token\n", token);

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ""
    }

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date (Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax',
    });
    
    return res.status(200).json({message: 'Successfully logged in', user:existingUser, token });
}

const verifyToken = (req,res,next)=> {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);
    if(!token){
        res.status(400).json({message: "No token found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id)
        req.id = user.id;
    });
    next();
};

const getUser = async(req,res, next) => {
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId, "-password");
    } catch(err){
        return new Error(err)
    }
    if (!user){
        return res.status(400).json({message:"User not found"});
    }
    return res.status(200).json({user})
}

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if(!prevToken){
        return res.status(400).json({message: "Could not find token"});
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
        if (err){
            console.log(err);
            return res.status(403).json({message: 'Authentication Failed'});
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({id: user.id}, JWT_SECRET_KEY, {
            expiresIn: "35s"
        })

        console.log("Generated Token\n", token);

        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date (Date.now() + 1000 * 30), //30 seconds
            httpOnly: true,
            sameSite: 'lax',
        });

        req.id = user.id;
        next();
    })
}

const forgetPassword = async (req,res, next) => {
    const {email} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }
    if (!existingUser){
        return res.status(400).json({message: "User not found. Please signup"})
    }

    const verificationCode = crypto.randomBytes(3).toString('hex');

    const expiration = moment().add(1, 'hour').toDate();

    const passwordReset = new PasswordReset({
        email,
        verificationCode,
        expiresAt: expiration,
    });

    passwordReset.save()
    .then(() => {
        console.log('Forget password details saved');
    })
    .catch(err => {
        console.error('Error saving forget password details:', err);
    });


    const mailOptions = {
        from: 'loanwise50@gmail.com',
        to: email,
        subject: "Password Reset Code",
        text: `Your password reset code is ${verificationCode}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
    });
      

    res.json({ message: 'Password reset code sent' })
}



const resetPassword = async (req,res, next) => {
    const { verificationCode, newPassword } = req.body;

    User.findOne({ verificationCode })
    .exec()
    .then((user) => {
        if (!user) {
        console.log('Invalid verification code');
        return;
        }

        if (moment().isAfter(user.expiresAt)) {
            console.log('Verification code has expired');
            return;
        }


        bcrypt.genSalt(15)
        .then((hashedPassword) => {
            user.password = hashedPassword;

            return user.save();
        })
        .then(() => {
            console.log('Password reset successful');
        })

        .catch((err) => {
            console.error('Error updating user password:', err);
        });
    })
    .catch((err) => {
        console.error('Error finding user:', err);
    });
   

    res.json({ message: "Password reset successful" })
};



exports.signup =signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forgetPassword = forgetPassword;
exports.resetPassword = resetPassword;
