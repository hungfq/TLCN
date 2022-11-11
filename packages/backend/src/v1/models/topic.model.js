const mongoose = require('mongoose');

const { Schema } = mongoose;

// const { Schema: { Types: { ObjectId } } } = mongoose;
const TopicSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  limit: { type: Number },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Topic', TopicSchema);
