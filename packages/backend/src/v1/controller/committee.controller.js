const _Committee = require('../models/committee.model');

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

module.exports = {
  insertCommittee,
  updateCommittee,
  deleteCommittee,
  listCommittee,

};
