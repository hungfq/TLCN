/* eslint-disable max-len */
const topicService = require('../services/topic.service');
const userService = require('../services/user.service');

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

module.exports = {
  insertTopic,
  findOneTopic,
  listTopic,
  searchTopic,
  updateOneTopic,
  deleteOneTopic,
  updateTopicStudent,
  updateTopicLecturer,
};
