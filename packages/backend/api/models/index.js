const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'female',
  },
  code: { type: String },

});
UserSchema.index(
  { code: 1 },
  { unique: true },
);
const User = mongoose.model('User', UserSchema);
module.exports = User;
