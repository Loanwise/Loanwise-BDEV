const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    inAppNotification: {
        type: Boolean,
        default: true,
    },
    emailNotification: {
        type: Boolean,
        default: false,
    },
    notificationSettings: {
        newApplications: {
            type: Boolean,
            default: true,
        },
        loanRepayments: {
            type: Boolean,
            default: false,
        },
        dueDates: {
            type: Boolean,
            default: false,
        },
    }
});

module.exports = mongoose.model('Users', usersSchema);