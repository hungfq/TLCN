const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  message: { type: String },
  time: { type: Date },
  createdBy: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Comment', CommentSchema);
