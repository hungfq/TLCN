/* eslint-disable max-len */
const xlsx = require('xlsx');
const scheduleService = require('../services/schedule.service');
const userService = require('../services/user.service');
const topicService = require('../services/topic.service');
const notificationService = require('../services/notification.service');
const fileUtils = require('../utils/file');
const _Schedule = require('../models/schedule.model');
const _Topic = require('../models/topic.model');

const createOne = async (req, res, next) => {
  try {
    const value = req.body;
    const schedule = await scheduleService.createOne(value);
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
    const value = req.body;
    await scheduleService.updateOne(id, value);
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

const listScheduleTopicLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topics = await scheduleService.listScheduleTopicLecturer(id, req.user._id);

    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const listScheduleTopicLecturerShort = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topics = await scheduleService.listScheduleTopicLecturerShort(id, req.user._id);

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

    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Đợt: ${schedule.name}. Có đăng ký mới trong đề tài: ${topic.code}`,
      req.user._id,
      null,
    );
    if (topic.lecturerId) {
      await notificationService.sendNotification(topic.lecturerId._id, notification);
    }
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

const getScheduleToday = async (req, res, next) => {
  try {
    const listSchedule = await _Schedule.find({
      startProposalDate: {
        $lt: Date.now(),
      },
      endRegisterDate: {
        $gte: Date.now(),
      },
    });
    return res.status(200).send(listSchedule);
  } catch (error) {
    return next(error);
  }
};

const excelExport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await _Schedule.findById(id);
    const topicList = await _Topic.find({ code: { $in: schedule.topics } });
    // const topics = await scheduleService.listTopics(id);
    const topicConvert = JSON.stringify(topicList);
    // const arr = [['A1', 'B1', 'C1'],
    //   ['A2', 'B2', 'C2'],
    //   ['A3', 'B3', 'C3']];
    const worksheet = xlsx.utils.json_to_sheet(topicConvert);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet);
    xlsx.writeFile(workbook, 'ScheduleReport.xlsx');
    // console.log('🚀 ~ file: schedule.controller.js:240 ~ excelExport ~ file', file);
    return res.status(200).send(topicConvert);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOne,
  findOne,
  updateOne,
  listSchedules,
  importStudents,
  importTopics,
  listScheduleTopicLecturer,
  listScheduleTopicLecturerShort,
  listTopicLecturer,
  register,
  cancelRegister,
  removeSchedule,
  getScheduleToday,
  excelExport,
};
