const _Topic = require('../models/topic.model');

const insert = async (title, description, limit, lecturerId) => {
  const topic = await _Topic.create({
    title, description, limit, lecturerId,
  });
  return topic;
};

const findOne = async (id) => {
  const topic = await _Topic.findOne({ _id: id }).populate('lecturerId');
  return topic;
};

const list = async (title, lecturerId) => {
  let listTopic;
  if (title) {
    listTopic = await _Topic.find({ title: { $regex: `.*${title}.*` } })
      .populate({ path: 'lecturerId', select: 'name _id' });
  } else if (lecturerId) {
    listTopic = await _Topic.find({ lecturerId })
      .populate({ path: 'lecturerId', select: 'name _id' });
  } else {
    listTopic = await _Topic.find({})
      .populate({ path: 'lecturerId', select: 'name _id' });
  }
  return listTopic;
};

const update = async (id, title, description, limit, lecturerId) => {
  await _Topic.updateOne({ _id: id }, {
    title, description, limit, lecturerId,
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
