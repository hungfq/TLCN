const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  code: { type: String },
  name: { type: String },
  email: { type: String },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'female',
  },
  picture: { type: String },
  notificationIds: { type: Array },
});

module.exports = mongoose.model('Student', StudentSchema);
