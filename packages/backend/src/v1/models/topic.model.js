const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String },
  description: { type: String },
  limit: { type: Number },
  startDate: { type: Date, default: new Date() },
  thesis_defense_date: { type: Date },
  deadline: { type: Date },
  major: { type: String },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  students: { type: Array, default: [] },
  tasks: { type: Array, default: [] },
  committeeId: { type: Schema.Types.ObjectId },
  advisorLecturerGrade: { type: String, default: '0' },
  committeePresidentGrade: { type: String, default: '0' },
  committeeSecretaryGrade: { type: String, default: '0' },
  criticalLecturerGrade: { type: String, default: '0' },
});

module.exports = mongoose.model('Topic', TopicSchema);
