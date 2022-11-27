const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
  {
    message: { type: String },
    createdBy: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Comment', CommentSchema);
