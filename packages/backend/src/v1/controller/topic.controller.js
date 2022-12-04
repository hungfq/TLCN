/* eslint-disable max-len */
const topicService = require('../services/topic.service');
const userService = require('../services/user.service');
const notificationService = require('../services/notification.service');
const fileUtils = require('../utils/file');
const _TopicProposal = require('../models/topic_proposal.model');

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

const addProposalTopic = async (req, res, next) => {
  try {
    let {
      // eslint-disable-next-line prefer-const
      title, description, lecturerId, limit, students, status,
    } = req.body;
    console.log('🚀 ~ file: topic.controller.js:142 ~ addProposalTopic ~ lecturerId', lecturerId);

    if (!title) return res.status(400).send('Not valid title');
    if (!description) description = '';
    if (!lecturerId) return res.status(400).send('Not valid lecturerId');
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(400).send('Not valid lecturerId');
    if (!limit) limit = 0;
    if (!students) students = [];
    const createdBy = req.user._id;

    const topic = await _TopicProposal.create({
      title, description, lecturerId, limit, students, createdBy, status,
    });
    console.log('🚀 ~ file: topic.controller.js:155 ~ addProposalTopic ~ topic', topic);
    if (lecturerId) {
      const notification = await notificationService.addNotification(
        'TOPIC PROPOSAL',
        'You are suggested in the proposal topic',
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

    const topicProposal = await topicService.findOneProposalTopic(id);
    await topicService.createOne(null, topicProposal.title, topicProposal.description, 1, null, null, req.user._id, []);

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
    const lecturerId = req.user._id;
    const { id } = req.params;
    const proposal = await _TopicProposal.findById(id);
    // TODO: Only the admin and created users update proposal
    if (!proposal) return res.status(404).send('Not found');

    // TODO: need to refactor function isAuth in middleware
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(401).send('Access Denied');
    const listTopics = await _TopicProposal.find({ lecturerId, status: 'LECTURER' });
    return res.status(200).send(listTopics);
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

  addProposalTopic,
  approveProposalTopic,
  removeProposalTopic,
  listProposalTopic,
  listTopicReviewByLecturer,
  listTopicProposalByCreatedId,
};
