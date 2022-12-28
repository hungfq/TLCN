/* eslint-disable consistent-return */
/* eslint-disable max-len */
const _Schedule = require('../models/schedule.model');
const _Student = require('../models/student.model');
const _Topic = require('../models/topic.model');
const userService = require('./user.service');

const findOne = async (_id) => {
  const schedule = _Schedule.findOne({ _id });
  return schedule;
};

const findOneByCode = async (code) => {
  const schedule = _Schedule.findOne({ code });
  return schedule;
};

const createOne = async (value) => {
  const schedule = await _Schedule.create(value);
  return schedule;
};

const removeSchedule = async (id) => {
  await _Schedule.deleteOne({ _id: id });
};

const updateOne = async (id, value) => {
  await _Schedule.updateOne({ _id: id }, value);
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

const listScheduleTopicLecturer = async (_id, lecturerId) => {
  const schedule = await _Schedule.find({});
  const topicList = await Promise.all(
    schedule.map(async (k) => {
      const temp = await _Topic.find({ code: { $in: k.topics }, lecturerId })
        .populate({ path: 'lecturerId', select: 'name email _id' });
      const result = await Promise.all(
        temp.map(async (topic) => {
          const { students } = topic;
          const studentList = await userService.getStudentByCodes(students);
          return { ...topic._doc, students: studentList };
        }),
      );
      return { schedule: k.name, topics: result };
    }),
  );

  return topicList;
};

const listScheduleTopicLecturerShort = async (_id, lecturerId) => {
  const schedules = await _Schedule.find({});
  const topicList = await Promise.all(
    schedules.map(async (k) => {
      const topics = await _Topic.find({ scheduleId: k._id, lecturerId })
        .select('_id title code');
      return { _id: k._id, name: k.name, topics };
    }),
  );
  const filteredArray = topicList.filter((e) => e.topics.length > 0);

  return filteredArray;
};

const listTopicLecturer = async (_id, lecturerId) => {
  const schedule = await _Schedule.findById(_id);
  const topicList = await _Topic.find({ code: { $in: schedule.topics }, lecturerId })
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

const updateStudents = async (_id, students) => {
  const schedule = await _Schedule.findById(_id);
  schedule.students = students;
  await schedule.save();
};

const updateTopics = async (_id, topics) => {
  const schedule = await _Schedule.findById(_id);
  schedule.topics = topics;
  await schedule.save();
};

module.exports = {
  findOne,
  findOneByCode,
  createOne,
  updateOne,
  listBetweenTime,
  listStudents,
  listTopics,
  listScheduleTopicLecturer,
  listScheduleTopicLecturerShort,
  listTopicLecturer,
  checkStudentInTopic,
  removeSchedule,
  updateStudents,
  updateTopics,
};
