const { Schema, model } = require('mongoose');

const otpSchema = new Schema({
  email: { type: String },
  otp: { type: String },
  create: { type: Date, default: Date.now, index: { expires: 100 } },
}, {
  collection: 'otp',
});

module.exports = model('otp', otpSchema);
