/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
const _ = require('lodash');

const _Topic = require('../models/topic.model');
const _TopicProposal = require('../models/topic_proposal.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');
const userService = require('./user.service');

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
  await _Topic.deleteOne({ _id: id });
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

const searchAndSort = async (value, type, sortField, sortType ) => {
  let listTopic;
  let listLecturer;
  let listLecturerId;

  switch (type) {
    case 'title':
      listTopic = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' }).sort([[sortField, sortType]]);;
      break;
    case 'lecturer':
      listLecturer = await _Lecturer.find({ name: { $regex: `.*${value}.*` } });
      listLecturerId = listLecturer.map((lecturer) => lecturer._id);
      listTopic = await _Topic.find({ lecturerId: { $in: listLecturerId } })
        .populate({ path: 'lecturerId', select: 'name _id' }).sort([[sortField, sortType]]);
      break;
    default:
      const listTopic1 = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' }).sort([[sortField, sortType]]);
      listLecturer = await _Lecturer.find({ name: { $regex: `.*${value}.*` } });
      listLecturerId = listLecturer.map((Lecturer) => Lecturer._id);
      const listTopic2 = await _Topic.find({ lecturerId: { $in: listLecturerId } })
        .populate({ path: 'lecturerId', select: 'name _id' }).sort([[sortField, sortType]]);
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

const updateStudents = async (_id, students) => {
  await _Topic.updateOne({ _id }, { students });
};

const updateLecturer = async (_id, lecturerId) => {
  await _Topic.updateOne({ _id }, { lecturerId });
};

const upsertOne = async (code, title, description, limit, deadline, major, lecturerId) => {
  const query = { code };
  const upsert = {
    $set: {
      code, title, description, limit, deadline, major, lecturerId, students: [],
    },
  };
  const options = { upsert: true };
  await _Topic.updateOne(query, upsert, options);
};

const addProposalTopic = async (title, description, lecturerId, createdBy) => {
  const topic = await _TopicProposal.create({
    title,
    description,
    lecturerId,
    createdBy,
  });
  return topic;
};

const findOneProposalTopic = async (_id) => {
  const topic = await _TopicProposal.findOne({ _id });
  return topic;
};

const deleteOneProposalTopic = async (_id) => {
  await _TopicProposal.deleteOne({ _id });
};

const listProposalTopic = async () => {
  const listTopic = await _TopicProposal.find({})
    .populate({ path: 'lecturerId', select: 'name _id' });

  const results = await Promise.all(
    listTopic.map(async (topic) => {
      const createdBy = await userService.findOneWithOnlyId(topic.createdBy);
      return { ...topic._doc, createdBy: { _id: createdBy._id, name: createdBy.name } };
    }),
  );
  return results;
};

const removeStudentInTopic = async (studentId, topicId) => {
  const topicOld = await _Topic.findById(topicId);
  const students = topicOld.students.filter(student => student._id.toString() !== studentId.toString());
  await updateStudents(topicId, students);
}

module.exports = {
  createOne,
  findOne,
  updateOne,
  list,
  search,
  removeOne,
  updateStudents,
  updateLecturer,
  upsertOne,
  removeStudentInTopic,
  addProposalTopic,
  findOneProposalTopic,
  deleteOneProposalTopic,
  listProposalTopic,
  searchAndSort,
};
