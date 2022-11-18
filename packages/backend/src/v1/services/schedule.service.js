/* eslint-disable max-len */
const _Schedule = require('../models/schedule.model');
const _Student = require('../models/student.model');
const _Topic = require('../models/topic.model');

const createOne = async (name, description, startDate, endDate) => {
  const schedule = await _Schedule.create({
    name,
    description,
    students: [],
    topics: [],
    startDate,
    endDate,
  });
  return schedule;
};

const updateOne = async (_id, name, description, startDate, endDate) => {
  await _Schedule.updateOne({ _id }, {
    name,
    description,
    startDate,
    endDate,
  });
};

const listBetweenTime = async (from, to) => {
  let schedule;
  if (from && to) {
    schedule = _Schedule.find({ startDate: { $gte: from }, endDate: { $lte: to } })
      .sort({ startDate: -1 });
  } else if (from) {
    schedule = _Schedule.find({ startDate: { $gte: from } })
      .sort({ startDate: -1 });
  } else if (to) {
    schedule = _Schedule.find({ endDate: { $lte: to } })
      .sort({ startDate: -1 });
  } else {
    schedule = _Schedule.find({}).sort({ startDate: -1 });
  }
  return schedule;
};

const updateStudents = async (_id, students) => {
  await _Schedule.updateOne({ _id }, { students });
};

const updateTopics = async (_id, topics) => {
  await _Schedule.updateOne({ _id }, { topics });
};

const listStudents = async (_id) => {
  const schedule = await _Schedule.findById(_id);
  const studentList = await _Student.find({ code: { $in: schedule.students } })
    .select(' -notificationIds');
  return studentList;
};

const listTopics = async (_id) => {
  const schedule = await _Schedule.findById(_id);
  const topicList = await _Topic.find({ code: { $in: schedule.topics } })
    .populate({ path: 'lecturerId', select: 'name email _id' });
  return topicList;
};

module.exports = {
  createOne,
  updateOne,
  listBetweenTime,
  updateStudents,
  listStudents,
  updateTopics,
  listTopics,
};
