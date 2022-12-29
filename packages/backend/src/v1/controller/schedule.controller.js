/* eslint-disable max-len */
const xlsx = require('xlsx');
const fs = require('fs');
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
    if (!value.code) {
      return res.status(422).send('Code is required');
    }
    if (!value.name) {
      return res.status(422).send('Name is required');
    }
    let schedule = await scheduleService.findOneByCode(value.code);
    if (schedule) {
      return res.status(409).send('Schedule already exist');
    }
    schedule = await scheduleService.createOne(value);
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
    if (!value.code) {
      return res.status(422).send('Code is required');
    }
    if (!value.name) {
      return res.status(422).send('Name is required');
    }
    await scheduleService.updateOne(id, value);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listSchedules = async (req, res, next) => {
  try {
    const schedule = await _Schedule.find({});
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
      await userService.upsertOne('STUDENT', user.CODE, user.NAME, user.EMAIL, user.GENDER);
      return user.CODE;
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
      const lecturer = await userService.findOneByCode('LECTURER', topic.LECTURER_CODE);
      await topicService.upsertOne(
        topic.CODE,
        topic.TITLE,
        topic.DESCRIPTION,
        topic.LIMIT,
        topic.DEADLINE,
        topic.MAJOR,
        lecturer ? lecturer._id : null,
      );
      return topic.CODE;
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
const listScheduleApproveLecturer = async (req, res, next) => {
  try {
    const listScheduleProposal = await _Schedule.find({
      startApproveDate: {
        $lt: Date.now(),
      },
      endApproveDate: {
        $gte: Date.now(),
      },
    });
    return res.status(200).send(listScheduleProposal);
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
    const { code } = req.user;
    const listScheduleProposal = await _Schedule.find({
      startProposalDate: {
        $lt: Date.now(),
      },
      endProposalDate: {
        $gte: Date.now(),
      },
      students: {
        $in: [code],
      },
    });
    const listScheduleRegister = await _Schedule.find({
      startRegisterDate: {
        $lte: Date.now(),
      },
      endRegisterDate: {
        $gte: Date.now(),
      },
      students: {
        $in: [code],
      },
    });
    return res.status(200).send({ proposal: listScheduleProposal, register: listScheduleRegister });
  } catch (error) {
    return next(error);
  }
};

const excelExport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topicList = await _Topic.find({ scheduleId: id })
      .select('students code title lecturerId criticalLecturerId -_id')
      .lean();
    const result = await Promise.all(topicList.map(async (topic) => {
      const lecturer = await userService.findOneWithOnlyId(topic.lecturerId);
      const critical = await userService.findOneWithOnlyId(topic.criticalLecturerId);
      const students = await userService.getStudentByCodes(topic.students);
      const studentCode = students.map((st) => st.code);
      const studentName = students.map((st) => st.name);
      return {
        student_code: studentCode.toString(),
        student_name: studentName.toString(),
        topic_code: topic.code,
        topic_title: topic.title,
        lecturer_code: lecturer ? lecturer.code : undefined,
        lecturer_name: lecturer ? lecturer.name : undefined,
        critical_code: critical ? critical.code : undefined,
        critical_name: critical ? critical.name : undefined,
      };
    }));
    const heading = [['STUDENT CODE', 'STUDENT NAME', 'TOPIC CODE', 'TOPIC NAME', 'LECTURER CODE', 'LECTURER NAME', 'CRITICAL CODE', 'CRITICAL NAME']];
    const worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.sheet_add_aoa(worksheet, heading);
    xlsx.utils.sheet_add_json(worksheet, result, { origin: 'A2', skipHeader: true });
    worksheet['!cols'] = [{ width: 16 }, { width: 24 }, { width: 16 }, { width: 44 }, { width: 16 }, { width: 24 }, { width: 16 }, { width: 24 }];
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet);
    // xlsx.writeFile(workbook, 'ScheduleReport.xlsx');

    const filename = 'ScheduleReport.xlsx';
    const wbOpts = { bookType: 'xlsx', type: 'buffer' };
    xlsx.writeFile(workbook, filename, wbOpts);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=ScheduleReport.xlsx');
    const stream = fs.createReadStream(filename);
    stream.pipe(res);
  } catch (error) {
    return next(error);
  }
};

const listStudents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const students = await scheduleService.listStudents(id);
    return res.status(200).send(students);
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
  listScheduleApproveLecturer,
  listStudents,
};
