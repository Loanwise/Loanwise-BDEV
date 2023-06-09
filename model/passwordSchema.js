const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model('PasswordReset', passwordResetSchema)
