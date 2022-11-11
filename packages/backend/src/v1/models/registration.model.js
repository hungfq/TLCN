const mongoose = require('mongoose');

const { Schema } = mongoose;

const RegistrationSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  },
  group: { type: String },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
