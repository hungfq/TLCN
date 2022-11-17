const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicProposalSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  createdBy: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Topic_Proposal', TopicProposalSchema);
