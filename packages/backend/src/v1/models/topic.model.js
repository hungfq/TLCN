const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String },
  description: { type: String },
  limit: { type: Number },
  deadline: { type: Date },
  major: { type: String },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  studentIds: { type: Array },
});

module.exports = mongoose.model('Topic', TopicSchema);
