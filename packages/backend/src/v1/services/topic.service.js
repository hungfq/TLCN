/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
const _ = require('lodash');

const _Topic = require('../models/topic.model');
const _TopicProposal = require('../models/topic_proposal.model');
const _Lecturer = require('../models/lecturer.model');
const _Schedule = require('../models/schedule.model');
const userService = require('./user.service');

const createOne = async (value) => {
  let prefix = '';
  let serial = '';
  const lastLastVersion = await _Topic.findOne().sort({ $natural: -1 }).limit(1);
  const schedule = await _Schedule.findById(value.scheduleId);
  if (!schedule) prefix = 'NONAME';
  else prefix = `${schedule.code}`;
  if (!lastLastVersion) serial = 1;
  else {
    const oldCode = lastLastVersion.code.split('-');
    const size = oldCode.length;
    serial = Number(oldCode[size - 1]);
    serial += 1;
  }
  value.code = `${prefix}-${serial}`;
  if (value.criticalLecturerId === '') {
    delete value.criticalLecturerId;
  }
  value.criticalLecturerApprove = false;
  value.advisorLecturerApprove = false;
  const topic = await _Topic.create(value);
  return topic;
};

const findOne = async (_id) => {
  const topic = await _Topic.findOne({ _id })
    .populate({ path: 'lecturerId', select: 'name _id' })
    .populate({ path: 'criticalLecturerId', select: 'name _id' })
    .populate({ path: 'scheduleId' });
  return topic;
};

const updateOne = async (_id, value) => {
  if (value.criticalLecturerId === '') {
    delete value.criticalLecturerId;
  }
  await _Topic.updateOne({ _id }, value);
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

const searchAndSort = async (value, type, sortField, sortType) => {
  let listTopic;
  let listLecturer;
  let listLecturerId;

  switch (type) {
    case 'title':
      listTopic = await _Topic.find({ title: { $regex: `.*${value}.*` } })
        .populate({ path: 'lecturerId', select: 'name _id' }).sort([[sortField, sortType]]);
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

const list = async (lecturerId, scheduleId) => {
  let listTopic;
  if (lecturerId && !scheduleId) {
    listTopic = await _Topic.find({ lecturerId })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
  } else if (!lecturerId && scheduleId) {
    listTopic = await _Topic.find({ scheduleId })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
  } else if (lecturerId && scheduleId) {
    listTopic = await _Topic.find({ scheduleId, lecturerId })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
  } else {
    listTopic = await _Topic.find({ })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
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

const upsertOne = async (code, title, description, limit, thesisDefenseDate, lecturerId, scheduleId, criticalLecturerId) => {
  const query = { code };
  const upsert = {
    $set: {
      code,
      title,
      description,
      limit,
      thesisDefenseDate,
      lecturerId,
      students: [],
      scheduleId,
      criticalLecturerId,
      advisorLecturerApprove: false,
      criticalLecturerApprove: false,
      advisorLecturerGrade: '0',
      committeePresidentGrade: '0',
      committeeSecretaryGrade: '0',
      criticalLecturerGrade: '0',
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
  const topic = await _TopicProposal.findById(_id);
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
  const students = topicOld.students.filter((student) => student._id.toString() !== studentId.toString());
  await updateStudents(topicId, students);
};

const getTopicMember = async (topicId) => {
  const topic = await _Topic.findById(topicId);
  const result = [];
  const students = await userService.getStudentByCodes(topic.students);
  students.forEach((student) => result.push({ _id: student._id, code: student.code, name: student.name }));
  const lecturer = await _Lecturer.findById(topic.lecturerId);
  result.push({ _id: lecturer._id, code: lecturer.code, name: lecturer.name });
  return result;
};

const getTopicStudent = async (topicId) => {
  const topic = await _Topic.findById(topicId);
  const result = [];
  const students = await userService.getStudentByCodes(topic.students);
  students.forEach((student) => result.push({ _id: student._id, code: student.code, name: student.name }));
  return result;
};

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
  getTopicMember,
  getTopicStudent,
};
