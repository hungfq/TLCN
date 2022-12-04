const _Notification = require('../models/notification.model');
const { getIo } = require('../socket');
const { getRedis } = require('../redis');

const addNotification = async (title, message, from, to) => {
  const notification = await _Notification.create({
    title, message, from, to, isRead: false,
  });
  return notification;
};

const getSocketIdByUserId = async (userId) => {
  const redis = await getRedis();

  const socketId = await redis.get(userId);

  return socketId;
};

const sendNotification = async (userId, notification) => {
  const socketId = getSocketIdByUserId(userId);
  if (socketId) {
    await getIo().to(socketId).emit('notify', notification);
  }
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
  sendNotification,
  getMultiNotify,
  readNotify,
  getSocketIdByUserId,
};
