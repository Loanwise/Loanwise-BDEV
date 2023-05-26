const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "JDBFEIUBndfbjfbhdbweb23urhwnr9wcj";

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
        expiresIn: "1hr"})
    return res.status(200).json({message: 'Successfully logged in', user:existingUser, token })
}

const verifyToken = (req,res,next)=> {
    const headers = req.headers['authorization'];
    console.log(headers)
}

exports.signup =signup;
exports.login = login;