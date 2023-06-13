const User = require("../model/User");
const forgotPassword = require("../model/PasswordSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT_SECRET_KEY = "JDBFEIUBndfbjfbhdbweb23urhwnr9wcj";
const {sendError, createRandomBytes} = require("../utils/helper");
const {generatePasswordResetTemplate} = require("../utils/mail")
const ResetToken = require("../model/resetToken");
const crypto = require('crypto');

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

    const hashedPassword = bcrypt.hashSync(password, 10);

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

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    if(!email) return sendError(res, 'Please provide a valid email');

     const user = await User.findOne({ email });
     if(!user) return sendError(res, 'User not found, invalid request!');

     const Token = await ResetToken.findOne({ owner: user._id})
    //  console.log(Token)
     if(!Token) return sendError(res, 'Only after one hour you can request for another token!');

     const randomBytes = await createRandomBytes();
     const resetToken = new resetToken({ owner:user._id, token: randomBytes})
     await resetToken.save();

     mailTransport().sendEmail({
        from: "security@email.com",
        to: user.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`),
     });

     res.json({success: "Password reset link is sent to your email"});
}

const signOut = (req, res) => {
    if(req.headers && req.headers.authorization){
        console.log(req.headers.authorization);
        res.send('okay');
    }
}

exports.signup =signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forgotPassword = forgotPassword;
exports.signOut = signOut;
