const _Notification = require('../models/notification.model');

const addNotification = async (title, message, from, to) => {
  const notification = await _Notification.create({
    title, message, from, to, isRead: false,
  });
  return notification;
};

const getMultiNotify = async (ids) => {
  const notification = await _Notification.find({ _id: { $in: ids } });
  return notification;
};

const readNotify = async (_id) => {
  await _Notification.updateOne({ _id }, { isRead: true });
};

module.exports = {
  addNotification,
  getMultiNotify,
  readNotify,
};
