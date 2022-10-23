const { Schema, model } = require('mongoose');

const otpSchema = new Schema({
  email: { type: String },
  otp: { type: String },
  create: { type: Date, default: Date.now, index: { expires: 20 } },
}, {
  collection: 'otp',
});

module.exports = model('otp', otpSchema);
