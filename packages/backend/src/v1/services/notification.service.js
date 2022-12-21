const _Notification = require('../models/notification.model');
const { getIo } = require('../socket');
const { getRedis } = require('../redis');
const userService = require('./user.service');

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
  await userService.addNotification(userId, notification._id);

  const socketId = await getSocketIdByUserId(userId.toString());
  if (socketId) {
    await getIo().to(socketId).emit('notify', notification);
  }
};

const getMultiNotify = async (ids) => {
  const notification = await _Notification.find({ _id: { $in: ids } })
    .sort({ createdAt: -1 });
  return notification;
};

const readNotify = async (_id) => {
  await _Notification.updateOne({ _id }, { isRead: true });
};

const deleteNotify = async (_id, userId) => {
  await userService.removeNotification(userId.toString(), _id.toString());
  await _Notification.findOneAndDelete({ _id });
};

const sendTaskRefreshSocket = async (topicId) => {
  await getIo().emit('task', topicId);
};

module.exports = {
  addNotification,
  sendNotification,
  getMultiNotify,
  readNotify,
  deleteNotify,
  getSocketIdByUserId,
  sendTaskRefreshSocket,
};
