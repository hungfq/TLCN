const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicProposalSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String },
  description: { type: String },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
});

module.exports = mongoose.model('Topic_Proposal', TopicProposalSchema);
