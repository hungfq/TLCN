/* eslint-disable max-len */
const fileUtils = require('../utils/file');
const _Committee = require('../models/committee.model');
const userService = require('../services/user.service');

const insertCommittee = async (req, res, next) => {
  try {
    const value = req.body;
    if (!value.committeePresidentId) {
      return res.status(422).send('President is required');
    }
    if (!value.committeeSecretaryId) {
      return res.status(422).send('Secretary is required');
    }
    if (!value.criticalLecturerId) {
      return res.status(422).send('Critical lecturer is required');
    }
    if (!value.code) {
      return res.status(422).send('Committee code is required');
    }
    let committee = await _Committee.findOne({ code: value.code });
    if (committee) {
      return res.status(409).send('Committee already exist');
    }
    committee = await _Committee.create(value);
    return res.status(201).send(committee);
  } catch (err) {
    return next(err);
  }
};
const updateCommittee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = req.body;
    if (!value.committeePresidentId) {
      return res.status(422).send('President is required');
    }
    if (!value.committeeSecretaryId) {
      return res.status(422).send('Secretary is required');
    }
    if (!value.criticalLecturerId) {
      return res.status(422).send('Critical lecturer is required');
    }
    if (!value.code) {
      return res.status(422).send('Committee code is required');
    }
    const cloneValue = { ...value };
    delete cloneValue.id;
    delete cloneValue.type;
    await _Committee.updateOne({ _id: id }, cloneValue);
    if (value.type === 'UPDATE_INFO') {
      // to something
    } else if (value.type === 'ADD_TOPIC') {
      // const committee = _Committee.findById(id);
    }
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
