const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    alternativeEmail: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: { 
        type: Date,
        required: true
    },
    nationalIdentityNumber: {
        type: String,
        required: true 
    },
    currentEmployer: { 
        type: String, 
        required: true 
    },
    jobTitle: { 
        type: String, 
        required: true 
    },
    lengthOfEmployment: {
        type: String,
        required: true
    },
    currentSalary: {
        type: Number,
        required: true
    }
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
