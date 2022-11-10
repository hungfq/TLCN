const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'female',
  },
  code: { type: String },
  picture: { type: String },
  role: { type: String },
});
module.exports = mongoose.model('User', UserSchema);
