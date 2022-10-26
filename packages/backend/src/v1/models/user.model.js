const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'female',
  },
  code: { type: String },

});

UserSchema.index(
  { code: 1, email: 1 },
  { unique: true },
);
module.exports = mongoose.model('User', UserSchema);
