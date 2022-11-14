/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
const _ = require('lodash');

const _Topic = require('../models/topic.model');
const _User = require('../models/user.model');
const _Role = require('../models/role.model');
const regisService = require('./registration.service');

const insert = async (title, description, limit, lecturerId, majorId) => {
  const topic = await _Topic.create({
    title, description, limit, lecturerId, majorId,
  });
  return topic;
};

const findOne = async (id) => {
  const topic = await _Topic.findOne({ _id: id })
    .populate({ path: 'lecturerId', select: 'name _id' })
    .populate({ path: 'majorId', select: 'name _id' });
  const count = await regisService.countTopicLimit(topic._id);
  return { ...topic._doc, current: count };
};

const search = async (value, type) => {
  const roleTeacher = await _Role.findOne({ name: 'TEACHER' });
  let listTopic;
  let listTeacher;
  let listTeacherId;

  switch (type) {
    case 'title':
      listTopic = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' })
        .populate({ path: 'majorId', select: 'name _id' });
      break;
    case 'teacher':
      listTeacher = await _User.find({
        name: { $regex: `.*${value}.*` },
        roleId: roleTeacher._id,
      });
      listTeacherId = listTeacher.map((teacher) => teacher._id);
      listTopic = await _Topic.find({ lecturerId: { $in: listTeacherId } })
        .populate({ path: 'lecturerId', select: 'name _id' })
        .populate({ path: 'majorId', select: 'name _id' });
      break;
    default:
      const listTopic1 = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' })
        .populate({ path: 'majorId', select: 'name _id' });
      listTeacher = await _User.find({
        name: { $regex: `.*${value}.*` },
        roleId: roleTeacher._id,
      });
      listTeacherId = listTeacher.map((teacher) => teacher._id);
      const listTopic2 = await _Topic.find({ lecturerId: { $in: listTeacherId } })
        .populate({ path: 'lecturerId', select: 'name _id' })
        .populate({ path: 'majorId', select: 'name _id' });
      listTopic = _.merge(listTopic1, listTopic2);
  }
  const results = await Promise.all(
    listTopic.map(async (topic) => {
      const count = await regisService.countTopicLimit(topic._id);
      return { ...topic._doc, current: count };
    }),
  );
  return results;
};

const list = async (majorId, lecturerId) => {
  let listTopic;
  if (majorId && lecturerId) {
    listTopic = await _Topic.find({
      lecturerId,
      majorId,
    })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'majorId', select: 'name _id' });
  } else if (majorId) {
    listTopic = await _Topic.find({ majorId })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'majorId', select: 'name _id' });
  } else if (lecturerId) {
    listTopic = await _Topic.find({ lecturerId })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'majorId', select: 'name _id' });
  } else {
    listTopic = await _Topic.find({})
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'majorId', select: 'name _id' });
  }

  const results = await Promise.all(
    listTopic.map(async (topic) => {
      const count = await regisService.countTopicLimit(topic._id);
      return { ...topic._doc, current: count };
    }),
  );

  return results;
};

const update = async (id, title, description, limit, lecturerId, majorId) => {
  await _Topic.updateOne({ _id: id }, {
    title, description, limit, lecturerId, majorId,
  });
};

const remove = async (id) => {
  await _Topic.deleteOne({ _id: id });
};

module.exports = {
  insert,
  findOne,
  list,
  search,
  update,
  remove,
};
