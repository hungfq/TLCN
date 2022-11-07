const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;
const TopicSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  limit: { type: Number },
  lecturerId: { type: ObjectId },
});

module.exports = mongoose.model('Topic', TopicSchema);
