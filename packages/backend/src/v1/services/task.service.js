/* eslint-disable max-len */
const _Task = require('../models/task.model');
const userService = require('./user.service');
const commentService = require('./comment.service');

const listTaskByTopic = async (topicId, studentId, statusTask) => {
  let tasks = await _Task.find({ topicId });
  if (studentId) tasks = tasks.filter((task) => task.assignTo._id.toString() === studentId.toString());
  if (statusTask) tasks = tasks.filter((task) => task.status === statusTask);
  return tasks;
};

const createNewTask = async (topicId, code, title, description, status, process, startTime, endTime, createdBy, assignTo) => {
  const task = {
    topicId,
    title,
    createdBy,
    assignTo,
    comment: [],
  };
  if (code) task.code = code;
  if (description) task.description = description;
  if (status) task.status = status;
  if (startTime) task.startTime = startTime;
  if (process) task.process = process;
  if (endTime) task.endTime = endTime;

  const newTask = await _Task.create(task);
  return newTask;
};

const getOneTask = async (taskId) => {
  const task = await _Task.findById(taskId);
  const createdBy = await userService.findOneWithOnlyId(task.createdBy);
  const createdByFilter = (({ _id, name }) => ({ _id, name }))(createdBy);
  const assignTo = await userService.findOneWithOnlyId(task.assignTo);
  const assignToFilter = (({ _id, name }) => ({ _id, name }))(assignTo ?? {});
  const comments = await commentService.getMultiCommentWithUserInfo(task.comment);
  return { ...task._doc, createdByFilter, assignToFilter, comments };
};

const updateOneTask = async (taskId, code, title, description, status, process, assignTo) => {
  // console.log("🚀 ~ file: task.service.js:41 ~ updateOneTask ~ taskId, title, description, status, process, assignTo", taskId, title, description, status, process, assignTo)
  await _Task.updateOne({ _id: taskId }, { code, title, description, status, process, assignTo });
};

const updateProcess = async (taskId, process) => {
  await _Task.updateOne({ taskId }, { process });
};

const updateStatusTask = async (id, status) => {
  await _Task.updateOne({ id }, { status });
};

const addCommentToTask = async (id, commentId) => {
  const task = await _Task.findById(id);
  task.comment.push(commentId);
  await task.save();
};

const updateAssignTo = async (id, assignTo) => {
  await _Task.updateOne({ id }, { assignTo });
};

const updateStartTime = async (id, startTime) => {
  await _Task.updateOne({ id }, { startTime });
};

const updateEndTime = async (id, endTime) => {
  await _Task.updateOne({ id }, { endTime });
};

const updateInfo = async (id, title, code, description) => {
  const task = await _Task.findById(id);
  task.title = title;
  task.code = code;
  task.description = description;
  await task.save();
};

const deleteTask = async (id) => {
  await _Task.deleteOne({ _id: id });
};

const getTopicIdByTask = async (taskId) => {
  const task = await _Task.findById(taskId);
  return task.topicId;
}

module.exports = {
  listTaskByTopic,
  createNewTask,
  getOneTask,
  updateOneTask,
  addCommentToTask,
  updateStatusTask,
  updateAssignTo,
  updateStartTime,
  updateInfo,
  updateEndTime,
  updateProcess,
  deleteTask,
  getTopicIdByTask,
};
