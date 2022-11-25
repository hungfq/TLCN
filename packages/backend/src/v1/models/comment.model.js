const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  message: { type: String },
  createdBy: { type: Schema.Types.ObjectId },
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at', // and `updated_at` to store the last updated date
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
