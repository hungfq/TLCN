const _User = require('../models/user.model');

const insert = async (firstName, lastName, sex, email) => {
  const user = await _User.create({
    firstName,
    lastName,
    sex,
    email,
  });
  return user;
};

const list = async () => {
  const listUser = await _User.find({});
  return listUser;
};

const remove = async (id) => {
  await _User.deleteOne({ _id: id });
};

const update = async (id, name, email, code, picture, role) => {
  await _User.updateOne({ _id: id }, {
    name, email, code, picture, role,
  });
};

const getUser = async (id) => {
  const user = await _User.findOne({ _id: id });
  return user;
};

module.exports = {
  list,
  insert,
  remove,
  update,
  getUser,
};
