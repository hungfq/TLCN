/* eslint-disable max-len */
const _Task = require('../models/task.model');
const taskService = require('../services/task.service');
const commentService = require('../services/comment.service');
const notifyService = require('../services/notification.service');

const listTaskByTopic = async (req, res, next) => {
  try {
    const {
      topicId, studentId, statusTask,
    } = req.query;
    const task = await taskService.listTaskByTopic(topicId, studentId, statusTask);
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const {
      topicId, code, title, description, status, assignTo,
    } = req.body;
    const createdBy = req.user._id;
    const task = await taskService.createNewTask(topicId, code, title, description, status, createdBy, assignTo);
    await notifyService.sendTaskRefreshSocket(topicId);
    return res.status(201).send(task);
  } catch (err) {
    return next(err);
  }
};

const getOneTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getOneTask(id);
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
};

const updateOneTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const {
      code, title, description, status, assignTo,
    } = req.body;
    await taskService.updateOneTask(taskId, code, title, description, status, assignTo);
    const topicId = await taskService.getTopicIdByTask(taskId);
    await notifyService.sendTaskRefreshSocket(topicId);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateStatusTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    await taskService.updateStatusTask(taskId, status);
    const topicId = await taskService.getTopicIdByTask(taskId);
    await notifyService.sendTaskRefreshSocket(topicId);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateAssignTo = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { assignTo } = req.body;
    await taskService.updateAssignTo(taskId, assignTo);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, code, description } = req.body;
    await taskService.updateInfo(id, title, code, description);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const getCommentTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await _Task.findById(id);
    const comment = await commentService.getMultiComment(task.comment);
    return res.status(200).send(comment);
  } catch (err) {
    return next(err);
  }
};

const addCommentTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const comment = await commentService.createComment(message, req.user._id);
    await taskService.addCommentToTask(id, comment._id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteCommentTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { commentId } = req.body;
    await taskService.removeCommentFromTask(id, commentId);
    await commentService.deleteComment(commentId);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getOneTask(id);
    await commentService.deleteMany(task.comment);
    await taskService.deleteTask(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const taskStatistics = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const task = await taskService.getStatistics(topicId);
    return res.status(200).send(task);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listTaskByTopic,
  createNewTask,
  getOneTask,
  updateOneTask,
  updateStatusTask,
  updateAssignTo,
  updateInfo,
  getCommentTask,
  addCommentTask,
  deleteCommentTask,
  deleteTask,
  taskStatistics,
};
