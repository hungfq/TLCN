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
  status: { 
    type: String,
    enum: ['TODO','PENDING', 'IN_PROCESS', 'DONE'],
    default: 'PENDING',
  },
  process: { 
    type: String,
    enum: ['APPROVED','NOT_APPROVE'],
    default : 'NOT_APPROVE',
  },
  startTime: { type: Date },
  endTime: { type: Date },
  comment: { type: Array },
  createdBy: { type: Schema.Types.ObjectId },
  assignTo: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Task', TaskSchema);
