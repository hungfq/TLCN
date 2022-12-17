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
  students: { type: Array },
  tasks: { type: Array },
  calendars: { type: Array },
  committeePresident: { type: Schema.Types.ObjectId },
  committeeSecretary: { type: Schema.Types.ObjectId },
  criticalLecturer: { type: Schema.Types.ObjectId },
  advisorLecturerGrade: { type: Array },
  committeePresidentGrade: { type: String },
  committeeSecretaryGrade: { type: String },
  criticalLecturerGrade: { type: String },

});

module.exports = mongoose.model('Topic', TopicSchema);
