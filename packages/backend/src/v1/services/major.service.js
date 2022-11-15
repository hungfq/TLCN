const _Major = require('../models/major.model');

const create = async (name, description) => {
  const major = await _Major.create({
    name, description,
  });
  return major;
};

const list = async () => {
  const majors = await _Major.find({});
  return majors;
};

const findOne = async (id) => {
  const major = await _Major.findOne({ _id: id });
  return major;
};

const update = async (id, name, description) => {
  await _Major.updateOne({ _id: id }, {
    name, description,
  });
};

module.exports = {
  create,
  list,
  findOne,
  update,
};
