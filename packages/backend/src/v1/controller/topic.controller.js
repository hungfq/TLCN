const {
  insert, list, search, update, remove, findOne,
} = require('../services/topic.service');

const insertTopic = async (req, res, next) => {
  try {
    const {
      title, description, limit, lecturerId,
    } = req.body;
    const topic = await insert(title, description, limit, lecturerId);
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};

const findOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await findOne(id);
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const listTopic = async (req, res, next) => {
  try {
    const { title, lecturerId } = req.query;
    const topics = await list(title, lecturerId);
    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const searchTopic = async (req, res, next) => {
  try {
    const { value, type } = req.query;
    const topics = await search(value, type);
    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, description, limit, lecturerId,
    } = req.body;
    await update(id, title, description, limit, lecturerId);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    await remove(id);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  insertTopic,
  findOneTopic,
  listTopic,
  searchTopic,
  updateTopic,
  deleteTopic,
};
