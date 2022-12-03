/* eslint-disable max-len */
const scheduleService = require('../services/schedule.service');
const userService = require('../services/user.service');
const topicService = require('../services/topic.service');
const fileUtils = require('../utils/file');

const createOne = async (req, res, next) => {
  try {
    const {
      name, description, startDate, endDate, students, topics,
    } = req.body;
    const schedule = await scheduleService.createOne(name, description, startDate, endDate, students, topics);
    return res.status(201).send(schedule);
  } catch (err) {
    return next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await scheduleService.findOne(id);
    return res.status(200).send(schedule);
  } catch (err) {
    return next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name, description, startDate, endDate, students, topics,
    } = req.body;
    await scheduleService.updateOne(id, name, description, startDate, endDate, students, topics);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listSchedules = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const schedule = await scheduleService.listBetweenTime(startDate, endDate);
    return res.status(200).send(schedule);
  } catch (err) {
    return next(err);
  }
};

const importStudents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jsonData = fileUtils.excelToJson(req.file.path);

    const students = await Promise.all(jsonData.map(async (user) => {
      await userService.upsertOne('STUDENT', user.code, user.name, user.email, user.gender);
      return user.code;
    }));

    await scheduleService.updateStudents(id, students);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listStudents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const students = await scheduleService.listStudents(id);
    return res.status(200).send(students);
  } catch (err) {
    return next(err);
  }
};
const removeSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    await scheduleService.removeSchedule(id);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const importTopics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jsonData = fileUtils.excelToJson(req.file.path);

    const topics = await Promise.all(jsonData.map(async (topic) => {
      const lecturer = await userService.findOneByCode('LECTURER', topic.lecturerCode);
      await topicService.upsertOne(
        topic.code,
        topic.title,
        topic.description,
        topic.limit,
        topic.deadline,
        topic.major,
        lecturer._id,
      );
      return topic.code;
    }));

    await scheduleService.updateTopics(id, topics);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listTopics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topics = await scheduleService.listTopics(id);

    const result = await Promise.all(
      topics.map(async (topic) => {
        const { students } = topic;
        const studentList = await userService.getStudentByCodes(students);
        return { ...topic._doc, students: studentList };
      }),
    );
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const listScheduleTopicLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topics = await scheduleService.listScheduleTopicLecturer(id, req.user._id);

    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const listTopicLecturer = async (req, res, next) => {
  try {
    const { id, lecturerId } = req.params;
    const topics = await scheduleService.listTopicLecturer(id, lecturerId);

    const result = await Promise.all(
      topics.map(async (topic) => {
        const { students } = topic;
        const studentList = await userService.getStudentByCodes(students);
        return { ...topic._doc, students: studentList };
      }),
    );
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { id, topicId } = req.params;
    const { code } = req.user;
    const schedule = await scheduleService.findOne(id);
    const topic = await topicService.findOne(topicId);
    const currentDate = new Date();
    if (!(currentDate > schedule.startDate && currentDate < schedule.endDate)) {
      return res.status(400).send('Not currently in registration time');
    }
    if (!schedule.topics.includes(topic.code)) {
      return res.status(400).send('Topic not in registration');
    }
    if (!schedule.students.includes(code)) {
      return res.status(400).send('You not have permissions to register');
    }
    if (topic.students.length >= topic.limit) {
      return res.status(400).send('Topic is full of students');
    }
    if (!(await scheduleService.checkStudentInTopic(req.user, schedule))) {
      return res.status(400).send('Please remove old register before');
    }
    const students = [...topic.students, code];
    await topicService.updateStudents(topicId, students);

    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const cancelRegister = async (req, res, next) => {
  try {
    const { id, topicId } = req.params;
    const { code } = req.user;
    const schedule = await scheduleService.findOne(id);
    const topic = await topicService.findOne(topicId);
    const currentDate = new Date();
    if (!(currentDate > schedule.startDate && currentDate < schedule.endDate)) {
      return res.status(400).send('Not currently in registration time');
    }
    if (!schedule.topics.includes(topic.code)) {
      return res.status(400).send('Topic not in registration');
    }
    if (!schedule.students.includes(code)) {
      return res.status(400).send('You not have permissions to register');
    }
    if (topic.students.length === 0) {
      return res.status(400).send('Topic is not have any students');
    }
    if (!topic.students.includes(code)) {
      return res.status(400).send('You not register this topic');
    }
    let students = [...topic.students];
    students = students.filter((item) => item !== code);
    await topicService.updateStudents(topicId, students);

    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createOne,
  findOne,
  updateOne,
  listSchedules,
  importStudents,
  listStudents,
  importTopics,
  listTopics,
  listScheduleTopicLecturer,
  listTopicLecturer,
  register,
  cancelRegister,
  removeSchedule,
};
