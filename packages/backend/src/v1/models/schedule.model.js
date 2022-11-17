const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  studentList: { type: Array },
  startDate: { type: Date },
  endDate: { type: Date },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
