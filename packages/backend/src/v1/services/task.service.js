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

const createNewTask = async (topicId, code, title, description, status,  createdBy, assignTo) => {
  const task = {
    topicId,
    title,
    createdBy,
    assignTo,
    comment: [],
  };
  if (code) task.code = code;
  if (status) task.status = status;

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

const updateOneTask = async (taskId, code, title, description, status, assignTo) => {
  // console.log("🚀 ~ file: task.service.js:41 ~ updateOneTask ~ taskId, title, description, status, process, assignTo", taskId, title, description, status, process, assignTo)
  await _Task.updateOne({ _id: taskId }, { code, title, description, status, assignTo });
};


const updateStatusTask = async (id, status) => {
  await _Task.updateOne({ id }, { status });
};

const addCommentToTask = async (id, commentId) => {
  const task = await _Task.findById(id);
  task.comment.push(commentId);
  await task.save();
};

const removeCommentFromTask = async (id, commentId) => {
  const task = await _Task.findById(id);
  task.comment = task.comment.filter(item => item.toString() !== commentId.toString());
  console.log(task.comment);

  await task.save();
};

const updateAssignTo = async (id, assignTo) => {
  await _Task.updateOne({ id }, { assignTo });
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

const getStatistics = async (topicId) => {
  let tasks = await _Task.find({ topicId });
  return tasks;
}

module.exports = {
  listTaskByTopic,
  createNewTask,
  getOneTask,
  updateOneTask,
  addCommentToTask,
  removeCommentFromTask,
  updateStatusTask,
  updateAssignTo,
  updateInfo,
  deleteTask,
  getTopicIdByTask,
  getStatistics,
};
