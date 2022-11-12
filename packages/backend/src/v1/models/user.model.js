const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
});
module.exports = mongoose.model('User', UserSchema);
