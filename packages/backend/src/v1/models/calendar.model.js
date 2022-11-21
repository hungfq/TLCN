const mongoose = require('mongoose');

const { Schema } = mongoose;

const CalendarSchema = new mongoose.Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  },
  description: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  comment: { type: Date },
});

module.exports = mongoose.model('Calendar', CalendarSchema);
