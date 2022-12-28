const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
    },
    code: { type: String },
    title: { type: String },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['TODO', 'PENDING', 'IN_PROCESS', 'DONE'],
      default: 'PENDING',
    },
    comment: { type: Array },
    createdBy: { type: Schema.Types.ObjectId },
    assignTo: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Task', TaskSchema);
