const _Task = require('../models/task.model')

const createNewTask = (topicId, code, title, description, status, process, startTime, endTime, createdBy, assignTo) {
  const task = {
    topicId,
    title,
    createdBy,
    assignTo,
    comment: [],
  }
  if(code) task.code = code;
  if(description) task.description = description;
  if(status) task.status = status;
  if(startTime) task.startTime = startTime;
  if(process) task.process = process;
  if(endTime) task.endTime = endTime;

  const newTask = await _Task.create(task);
  return newTask;
}

const updateProgress = async (taskId, process) => {
  const task = await _Task.findById(taskId);
  task.process = process;
  await task.save();
}

const deleteTask = async (taskId) => {
  await _Task.delete({_id: taskId});
}

const updateStatusTask = (id, status) => {
  const task = await _Task.findById(id);
  task.status = status;
  await task.save();
}

const listTaskByTopic = async (topicId, studentId, statusTask) => {
  let tasks = await _Task.find({topicId});
  if(studentId) task = tasks.filter(task => task.assignTo._id.toString() === studentId.toString());
  if(statusTask) task = tasks.filter(task => task.status ===  statusTask);
  return task;
}


const addCommentToTask = async (taskId, commentId) => {
  const task = await _Task.findById(taskId);
  task.comment.push(commentId);
  await task.save();
}

const updateAssignTo = async (taskId, assignTo) => {
  const task = await _Task.findById(taskId);
  task.assignTo = assignTo;
  await task.save();
}
const updateStartTime = async (taskId, startTime) => {
  const task = await _Task.findById(taskId);
  task.startTime = startTime;
  await task.save();
}


const updateEndTime = async (taskId, endTime) => {
  const task = await _Task.findById(taskId);
  task.endTime = endTime;
  await task.save();
}


const updateInfo = async (taskId, title, code, description) => {
  const task = await _Task.findById(taskId);
  task.title = title;
  task.code = code;
  task.description = description;
  await task.save();
}

module.exports = {
  listTaskByTopic,
  addCommentToTask,
  updateStatusTask,
  updateAssignTo,
  updateStartTime,
  updateInfo,
  updateEndTime,
  updateProgress,
  deleteTask,
};

