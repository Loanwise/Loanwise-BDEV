const mongoose = require('mongoose');

const Schema = mongoose.Schema

const passwordResetSchema = new Schema ({
    userId: String,
    resetString: String,
    createdAt: Date,
    expiresAt: Date,
    
    // name:{
    //     type: String,
    //     required: true
    // },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // password:{
    //     type: String,
    //     required: true,
    //     minlength: 6
    // }
})

const passwordReset = mongoose.model('passwordReset', passwordResetSchema);

module.exports = passwordReset;