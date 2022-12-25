/* eslint-disable max-len */
const fileUtils = require('../utils/file');
const _Committee = require('../models/committee.model');
const userService = require('../services/user.service');

const insertCommittee = async (req, res, next) => {
  try {
    const value = req.body;
    const topic = await _Committee.create(value);
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};
const updateCommittee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = req.body;
    delete value.id;
    await _Committee.updateOne({ _id: id }, value);
    return res.status(200).send('Success');
  } catch (err) {
    return next(err);
  }
};
const deleteCommittee = async (req, res, next) => {
  try {
    const { id } = req.params;
    await _Committee.deleteOne({ _id: id });
    return res.status(200).send('Success');
  } catch (err) {
    return next(err);
  }
};
const listCommittee = async (req, res, next) => {
  try {
    const list = await _Committee.find({})
      .populate('committeePresidentId', '_id name')
      .populate('committeeSecretaryId', '_id name')
      .populate('criticalLecturerId', '_id name');
    return res.status(200).send(list);
  } catch (err) {
    return next(err);
  }
};

const upsertOne = async (code, name, committeePresidentId, committeeSecretaryId, criticalLecturerId) => {
  console.log('🚀 ~ file: committee.controller.js:48 ~ upsertOne ~ code, name, committeePresidentId, committeeSecretaryId, criticalLecturerId', code, name, committeePresidentId, committeeSecretaryId, criticalLecturerId);
  const query = { code };
  const upsert = {
    $set: {
      code, name, committeePresidentId, committeeSecretaryId, criticalLecturerId,
    },
  };
  const options = { upsert: true };
  await _Committee.updateOne(query, upsert, options);
};

const importCommittee = async (req, res, next) => {
  try {
    const jsonData = fileUtils.excelToJson(req.file.path);

    jsonData.forEach(async (committee) => {
      const president = await userService.findOneByCode('LECTURER', committee.PRESIDENT);
      const secretary = await userService.findOneByCode('LECTURER', committee.SECRETARY);
      const critical = await userService.findOneByCode('LECTURER', committee.CRITICAL);
      await upsertOne(
        committee.CODE,
        committee.NAME,
        president ? president._id : undefined,
        secretary ? secretary._id : undefined,
        critical ? critical._id : undefined,
      );
    });

    return res.status(201).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  insertCommittee,
  updateCommittee,
  deleteCommittee,
  listCommittee,
  importCommittee,
};
