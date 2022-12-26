const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  students: { type: Array },
  startDate: { type: Date, default: new Date() },
  deadline: { type: Date },
  startProposalDate: { type: Date },
  endProposalDate: { type: Date },
  startApproveDate: { type: Date },
  endApproveDate: { type: Date },
  startRegisterDate: { type: Date },
  endRegisterDate: { type: Date },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
