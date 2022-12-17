const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  students: { type: Array },
  topics: { type: Array },
  startDate: { type: Date },
  endDate: { type: Date },
  type: { type: String },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
