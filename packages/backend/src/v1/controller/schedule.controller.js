/* eslint-disable max-len */
const scheduleService = require('../services/schedule.service');
const userService = require('../services/user.service');
const topicService = require('../services/topic.service');
const fileUtils = require('../utils/file');

const createOne = async (req, res, next) => {
  try {
    const {
      name, description, startDate, endDate,
    } = req.body;
    const schedule = await scheduleService.createOne(name, description, startDate, endDate);
    return res.status(201).send(schedule);
  } catch (err) {
    return next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name, description, startDate, endDate,
    } = req.body;
    await scheduleService.updateOne(id, name, description, startDate, endDate);
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

module.exports = {
  createOne,
  updateOne,
  listSchedules,
  importStudents,
  listStudents,
  importTopics,
  listTopics,
};
