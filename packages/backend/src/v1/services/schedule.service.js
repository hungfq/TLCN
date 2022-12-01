/* eslint-disable consistent-return */
/* eslint-disable max-len */
const _Schedule = require('../models/schedule.model');
const _Student = require('../models/student.model');
const _Topic = require('../models/topic.model');

const findOne = async (_id) => {
  const schedule = _Schedule.findOne({ _id });
  return schedule;
};

const createOne = async (name, description, startDate, endDate, students, topics) => {
  let listStudents = [];
  let listTopics = [];
  if (students) listStudents = students;
  if (topics) listTopics = topics;
  const schedule = await _Schedule.create({
    name,
    description,
    startDate,
    endDate,
    students: listStudents,
    topics: listTopics,
  });
  return schedule;
};

const removeSchedule = async (id) => {
  await _Schedule.deleteOne({ _id: id });
};

const updateOne = async (_id, name, description, startDate, endDate, students, topics) => {
  let value = {
    name,
    description,
    startDate,
    endDate,
  };
  if (students) value = { ...value, students };
  if (topics) value = { ...value, topics };
  await _Schedule.updateOne({ _id }, value);
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

const checkStudentInTopic = async (user, schedule) => {
  let flag = true;

  const topicList = await _Topic.find({ code: { $in: schedule.topics } });
  topicList.forEach((topic) => {
    if (topic.students.includes(user.code)) {
      flag = false;
    }
  });
  return flag;
};

module.exports = {
  findOne,
  createOne,
  updateOne,
  listBetweenTime,
  updateStudents,
  listStudents,
  updateTopics,
  listTopics,
  checkStudentInTopic,
  removeSchedule,
};
