/* eslint-disable max-len */

const _Registration = require('../models/registration.model');
const topicService = require('../services/topic.service');
const registrationService = require('../services/registration.service');

async function checkCanRegistration(user, topic) {
  const currentLimit = await _Registration.countDocuments({ topicId: topic._id });
  const alreadyRegistered = await _Registration.findOne({ studentId: user._id });
  return (currentLimit < topic.limit) && (!alreadyRegistered);
}

const viewRegistration = async (req, res, next) => {
  try {
    const topicId = null;
    const studentId = req.user._id;
    const registrations = await registrationService.list(topicId, studentId);
    return res.status(200).send(registrations);
  } catch (err) {
    return next(err);
  }
};

const registrationTopic = async (req, res, next) => {
  try {
    const topicId = req.body.topic_id;
    if (!topicId) {
      return res.status(422).send('topic_id is required');
    }
    const { user } = req;
    const topic = await topicService.findOne({ _id: topicId });
    if (await checkCanRegistration(user, topic)) {
      const regis = await registrationService.insert(topic._id, user._id);
      return res.status(200).send(regis);
    }
    return res.status(400).send('can not register');
  } catch (err) {
    return next(err);
  }
};

const cancelRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const registration = await _Registration.findOne({ _id: id });
    if (!registration) {
      return res.sendStatus(404);
    }
    if (String(registration.studentId) === String(user._id)) {
      await registrationService.remove(id);
      return res.status(200).send('success');
    }
    return res.status(400).send('permission denied');
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const topicId = req.query.topic_id;
    const studentId = req.query.student_id;
    const registrations = await registrationService.list(topicId, studentId);
    return res.status(200).send(registrations);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { topicId, studentId, group } = req.body;
    const registration = await registrationService.create(topicId, studentId, group);
    return res.status(201).send(registration);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topicId, studentId, group } = req.body;
    await registrationService.update(id, topicId, studentId, group);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await registrationService.remove(id);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  viewRegistration,
  registrationTopic,
  cancelRegistration,
  list,
  create,
  update,
  remove,
};
