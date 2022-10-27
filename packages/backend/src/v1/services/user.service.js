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
  await _User.remove({ _id: id });
};

const update = async (id, firstName, lastName, sex, email) => {
  await _User.updateOne({ _id: id }, {
    firstName, lastName, sex, email,
  });
};
module.exports = {
  list,
  insert,
  remove,
  update,
};
