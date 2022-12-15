/* eslint-disable max-len */
const topicService = require('../services/topic.service');
const userService = require('../services/user.service');
const notificationService = require('../services/notification.service');
const fileUtils = require('../utils/file');
const _TopicProposal = require('../models/topic_proposal.model');
const _Schedule = require('../models/schedule.model');
const _Topic = require('../models/topic.model');

const importTopics = async (req, res, next) => {
  try {
    const jsonData = fileUtils.excelToJson(req.file.path);

    jsonData.forEach(async (topic) => {
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
    });

    return res.status(201).send('Successfully');
  } catch (err) {
    return next(err);
  }
};
const insertTopic = async (req, res, next) => {
  try {
    const {
      code, title, description, limit, deadline, major, lecturerId, students,
    } = req.body;
    const topic = await topicService.createOne(code, title, description, limit, deadline, major, lecturerId, students);
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};

const findOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    const { students } = topic;
    const studentList = await userService.getStudentByCodes(students);
    topic.students = studentList;
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const updateOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      code, title, description, limit, deadline, major, lecturerId, students,
    } = req.body;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateOne(id, code, title, description, limit, deadline, major, lecturerId, students);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    await topicService.removeOne(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listTopic = async (req, res, next) => {
  try {
    const { lecturerId } = req.query;
    const topics = await topicService.list(lecturerId);
    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const searchTopic = async (req, res, next) => {
  try {
    const { value, type } = req.query;
    const topics = await topicService.search(value, type);
    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const updateTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { students } = req.body;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateStudents(id, students);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateTopicLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lecturerId } = req.body;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateLecturer(id, lecturerId);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const getTopicMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await topicService.getTopicMember(id);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const addProposalTopic = async (req, res, next) => {
  try {
    let {
      // eslint-disable-next-line prefer-const
      title, description, lecturerId, limit, students, status, deadline, major,
    } = req.body;

    if (!title) return res.status(400).send('Not valid title');
    if (!description) description = '';
    if (!lecturerId) return res.status(400).send('Not valid lecturerId');
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(400).send('Not valid lecturerId');
    if (!limit) limit = 0;
    if (!students) students = [];
    const createdBy = req.user._id;

    const topic = await _TopicProposal.create({
      title, description, lecturerId, limit, students, createdBy, status, deadline, major,
    });
    console.log('🚀 ~ file: topic.controller.js:155 ~ addProposalTopic ~ topic', topic);
    if (lecturerId) {
      const notification = await notificationService.addNotification(
        'ĐỀ XUẤT ĐỀ TÀI',
        'Bạn được yêu cầu hướng dẫn trong một đề tài',
        req.user._id,
        [lecturerId],
      );
      await userService.addNotificationByType('LECTURER', lecturerId, notification._id);
      console.log(`TODO: send notification to ${lecturerId}`);
    }
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};

const approveProposalTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, description, code, limit, deadline, major, students, lecturerId,
    } = req.body;

    const topicProposal = await topicService.findOneProposalTopic(id);
    await topicService.createOne(code, title, description, limit, deadline, major, lecturerId, students);

    await topicService.deleteOneProposalTopic(id);

    console.log(`TODO: send notification to ${topicProposal.createdBy}`);

    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const removeProposalTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topic = await topicService.findOneProposalTopic(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.deleteOneProposalTopic(id);
    console.log(`TODO: send notification to ${topic.createdBy}`);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listProposalTopic = async (req, res, next) => {
  try {
    const topic = await topicService.listProposalTopic();
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const listTopicReviewByLecturer = async (req, res, next) => {
  try {
    const lecturerId = req.user._id;
    // TODO: need to refactor function isAuth in middleware
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(401).send('Access Denied');
    const listTopics = await _TopicProposal.find({ lecturerId, status: 'LECTURER' });
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const listTopicReviewByAdmin = async (req, res, next) => {
  try {
    // TODO: need to refactor function isAuth in middleware
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(401).send('Access Denied');
    const listTopics = await _TopicProposal.find({ status: 'ADMIN' });
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const listTopicProposalByCreatedId = async (req, res, next) => {
  try {
    const createdBy = req.user._id;
    // TODO: need to refactor function isAuth in middleware
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(401).send('Access Denied');
    const listTopics = await _TopicProposal.find({ createdBy });
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const updateProposalByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let {
      // eslint-disable-next-line prefer-const
      title, description, lecturerId, limit, students, deadline, major,
    } = req.body;
    const proposal = await _TopicProposal.findById(id);
    // TODO: Only the admin and created users update proposal
    if (!proposal) return res.status(404).send('Not found');

    await _TopicProposal.updateOne({ _id: id }, {
      title, description, lecturerId, limit, students, deadline, major,
    });
    return res.status(200).send(
      'Successfully updated proposal',
    );
  } catch (err) {
    return next(err);
  }
};

const approveProposalByLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proposal = await _TopicProposal.findById(id);
    // TODO: Only the admin and created users update proposal
    if (!proposal) return res.status(404).send('Not found');

    await _TopicProposal.updateOne({ _id: id }, {
      status: 'ADMIN',
    });
    return res.status(200).send(
      'Successfully updated proposal',
    );
  } catch (err) {
    return next(err);
  }
};

const getListTopicAcceptRegister = async (req, res, next) => {
  try {
    const { code } = req.user;
    // console.log('🚀 ~ file: topic.controller.js:299 ~ getListTopicAcceptRegister ~ code', code);
    let listCodeTopic = [];
    const listSchedule = await _Schedule.find({
      startDate: {
        $lt: Date.now(),
      },
      endDate: {
        $gte: Date.now(),
      },
      students: {
        $in: [code],
      },
    });
    listSchedule.forEach((s) => {
      if (s.topics.length > 1) listCodeTopic.push(...s.topics);
      else listCodeTopic.push(s.topics);
    });
    const setSchedule = new Set(listCodeTopic);
    listCodeTopic = [...setSchedule];
    const listTopicAcceptRegisters = await _Topic.find({
      code: {
        $in: listCodeTopic,
      },
    });
    return res.status(200).send(listTopicAcceptRegisters);
  } catch (e) {
    return next(e);
  }
};

const addNewRegisterTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.user;
    const topicOld = await _Topic.findById(id);
    const isRegister = await _Topic.findOne({
      students: {
        $in: [code],
      },
    });
    if (!topicOld) return res.status(404).send('Topic not found');
    if (isRegister) return res.status(400).send('Register is exist');
    if (topicOld.students.length >= 1 && topicOld.limit) return res.status(422).send('The register is out of limit');
    const oldStudent = topicOld.students;
    topicOld.students = [...oldStudent, code];
    await topicOld.save();
    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Có đăng ký mới trong đề tài: ${topicOld.code}`,
      req.user._id,
      null,
    );
    if (topicOld.lecturerId) {
      await notificationService.sendNotification(topicOld.lecturerId._id, notification);
    }
    return res.status(200).send('Register success');
  } catch (err) {
    return next(err);
  }
};
const removeRegisterTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.user;
    const topicOld = await _Topic.findById(id);
    if (!topicOld) return res.status(404).send('Topic not found');
    const oldStudent = topicOld.students.filter((s) => s !== code);
    topicOld.students = [...oldStudent];
    await topicOld.save();
    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Hủy đăng ký mới trong đề tài: ${topicOld.code}`,
      req.user._id,
      null,
    );
    if (topicOld.lecturerId) {
      await notificationService.sendNotification(topicOld.lecturerId._id, notification);
    }
    return res.status(200).send('Remove success');
  } catch (err) {
    return next(err);
  }
};

const getResultRegister = async (req, res, next) => {
  try {
    const { code } = req.user;
    const topic = await _Topic.findOne({
      students: {
        $in: [code],
      },
    });
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  importTopics,
  insertTopic,
  findOneTopic,
  listTopic,
  searchTopic,
  updateOneTopic,
  deleteOneTopic,
  updateTopicStudent,
  updateTopicLecturer,
  getResultRegister,

  getTopicMember,

  addProposalTopic,
  approveProposalTopic,
  removeProposalTopic,
  listProposalTopic,
  listTopicReviewByLecturer,
  listTopicProposalByCreatedId,
  updateProposalByUser,
  approveProposalByLecturer,
  listTopicReviewByAdmin,
  getListTopicAcceptRegister,
  addNewRegisterTopicStudent,
  removeRegisterTopicStudent,
};
