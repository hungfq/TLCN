/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
const _ = require('lodash');

const _Topic = require('../models/topic.model');
const _Lecturer = require('../models/lecturer.model');

const createOne = async (code, title, description, limit, deadline, major, lecturerId, students) => {
  const topic = await _Topic.create({
    code,
    title,
    description,
    limit,
    deadline,
    major,
    lecturerId,
    students,
  });
  return topic;
};

const findOne = async (_id) => {
  const topic = await _Topic.findOne({ _id })
    .populate({ path: 'lecturerId', select: 'name email _id' });
  return topic;
};

const updateOne = async (_id, code, title, description, limit, deadline, major, lecturerId, students) => {
  await _Topic.updateOne({ _id }, {
    code, title, description, limit, deadline, major, lecturerId, students,
  });
};

const removeOne = async (id) => {
  await _Topic.remove({ _id: id });
};

const search = async (value, type) => {
  let listTopic;
  let listLecturer;
  let listLecturerId;

  switch (type) {
    case 'title':
      listTopic = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' });
      break;
    case 'lecturer':
      listLecturer = await _Lecturer.find({ name: { $regex: `.*${value}.*` } });
      listLecturerId = listLecturer.map((lecturer) => lecturer._id);
      listTopic = await _Topic.find({ lecturerId: { $in: listLecturerId } })
        .populate({ path: 'lecturerId', select: 'name _id' });
      break;
    default:
      const listTopic1 = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' });
      listLecturer = await _Lecturer.find({ name: { $regex: `.*${value}.*` } });
      listLecturerId = listLecturer.map((Lecturer) => Lecturer._id);
      const listTopic2 = await _Topic.find({ lecturerId: { $in: listLecturerId } })
        .populate({ path: 'lecturerId', select: 'name _id' });
      listTopic = _.merge(listTopic1, listTopic2);
  }
  const results = listTopic.map((topic) => {
    const count = topic.students.length;
    return { ...topic._doc, current: count };
  });
  return results;
};

const list = async (lecturerId) => {
  let listTopic;
  if (lecturerId) {
    listTopic = await _Topic.find({ lecturerId })
      .populate({ path: 'lecturerId', select: 'name _id' });
  } else {
    listTopic = await _Topic.find({})
      .populate({ path: 'lecturerId', select: 'name _id' });
  }

  const results = listTopic.map((topic) => {
    const count = topic.students.length;
    return { ...topic._doc, current: count };
  });

  return results;
};

module.exports = {
  createOne,
  findOne,
  updateOne,
  list,
  search,
  removeOne,
};
