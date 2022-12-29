const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String },
  description: { type: String },
  limit: { type: Number },
  thesisDefenseDate: { type: Date },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
    default: null,
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule',
    default: null,
  },
  criticalLecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  students: { type: Array, default: [] },
  advisorLecturerGrade: { type: String, default: '0' },
  committeePresidentGrade: { type: String, default: '0' },
  committeeSecretaryGrade: { type: String, default: '0' },
  criticalLecturerGrade: { type: String, default: '0' },
  criticalLecturerApprove: { type: Boolean, default: false },
  advisorLecturerApprove: { type: Boolean, default: false },
});

module.exports = mongoose.model('Topic', TopicSchema);
