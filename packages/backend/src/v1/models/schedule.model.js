const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  students: { type: Array },
  topics: { type: Array },
  startProposalDate: { type: Date },
  endProposalDate: { type: Date },
  startApproveDate: { type: Date },
  endApproveDate: { type: Date },
  startRegisterDate: { type: Date },
  endRegisterDate: { type: Date },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
