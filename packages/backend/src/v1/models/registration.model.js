const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;
const RegistrationSchema = new mongoose.Schema({
  studentId: { type: ObjectId },
  topicId: { type: ObjectId },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
