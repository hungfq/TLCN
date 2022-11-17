const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  },
  code: { type: String },
  title: { type: String },
  description: { type: String },
  status: { type: String },
  process: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  comment: { type: Date },
  createdBy: { type: Schema.Types.ObjectId },
  assignTo: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Task', TaskSchema);
