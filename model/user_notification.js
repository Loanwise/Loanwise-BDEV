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
});

module.exports = mongoose.model('Users', usersSchema);