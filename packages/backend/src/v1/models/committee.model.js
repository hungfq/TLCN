const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommitteeSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  committeePresidentId: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
  committeeSecretaryId: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
  criticalLecturerId: { type: Schema.Types.ObjectId, ref: 'Lecturer' },
  topics: { type: Array },
});

module.exports = mongoose.model('committee', CommitteeSchema);
