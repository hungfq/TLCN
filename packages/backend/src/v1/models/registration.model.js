const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;
const RegistrationSchema = new mongoose.Schema({
  studentId: { type: ObjectId },
  topicId: { type: ObjectId },
  group: { type: String },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
