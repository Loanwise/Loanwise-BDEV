const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    newApplications: {
        inAppNotification: {
            type: Boolean,
            default: true,
        },
        emailNotification: {
            type: Boolean,
            default: false,
        },
    },
    loanRepayments: {
        inAppNotification: {
            type: Boolean,
            default: true,
        },
        emailNotification: {
            type: Boolean,
            default: false,
        },
    },
    dueDates: {
        inAppNotification: {
            type: Boolean,
            default: true,
        },
        emailNotification: {
            type: Boolean,
            default: false,
        },
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    securityQuestions: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }],
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    mobileNumber: {
        type: String,
        // required: true,
    },
    changeRole: {
        type: String,
        // required: true,
    },
    profilePicture: {
        type: String,
    }
});

module.exports = mongoose.model('Users', usersSchema);