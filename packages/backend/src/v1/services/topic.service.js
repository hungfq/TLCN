const _Topic = require('../models/topic.model');

const insert = async (title, description, type, lecturerId) => {
  const topic = await _Topic.create({
    title, description, type, lecturerId,
  });
  return topic;
};

const findOne = async (id) => {
  const topic = await _Topic.findOne({ _id: id });
  return topic;
};

const list = async () => {
  const listTopic = await _Topic.find({});
  return listTopic;
};

const update = async (id, title, description, type, lecturerId) => {
  await _Topic.updateOne({ _id: id }, {
    title, description, type, lecturerId,
  });
};

const remove = async (id) => {
  await _Topic.remove({ _id: id });
};

module.exports = {
  insert,
  findOne,
  list,
  update,
  remove,
};
