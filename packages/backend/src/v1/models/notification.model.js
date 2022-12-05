const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new mongoose.Schema(
  {
    code: { type: String },
    from: { type: Schema.Types.ObjectId },
    to: { type: Array },
    title: { type: String },
    message: { type: String },
    isRead: { type: Boolean },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Notification', NotificationSchema);
