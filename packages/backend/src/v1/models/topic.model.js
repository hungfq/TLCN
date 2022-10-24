const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;
const TopicSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  type: { type: String },
  lecturerId: { type: ObjectId },
});

module.exports = mongoose.model('Topic', TopicSchema);
