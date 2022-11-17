const _User = require('../models/user.model');
const _Admin = require('../models/admin.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');

const insert = async (firstName, lastName, sex, email) => {
  const user = await _User.create({
    firstName,
    lastName,
    sex,
    email,
  });
  return user;
};

const list = async (roleId) => {
  let listUser;
  if (roleId) {
    listUser = await _User.find({ roleId })
      .populate({ path: 'roleId', select: 'name _id' });
  } else {
    listUser = await _User.find({})
      .populate({ path: 'roleId', select: 'name _id' });
  }
  return listUser;
};

const remove = async (id) => {
  await _User.deleteOne({ _id: id });
};

const update = async (id, name, email, code, picture, roleId) => {
  await _User.updateOne({ _id: id }, {
    name, email, code, picture, roleId,
  });
};

const getUser = async (id) => {
  const user = await _User.findOne({ _id: id })
    .populate({ path: 'roleId', select: 'name _id' });
  return user;
};

const editProfile = async (id, name, code, sex) => {
  await _User.updateOne({ _id: id }, {
    name, code, sex,
  });
};

function getRoleFromType(type) {
  let role = null;
  switch (type) {
    case 'ADMIN':
      role = _Admin;
      break;
    case 'LECTURER':
      role = _Lecturer;
      break;
    case 'STUDENT':
      role = _Student;
      break;
    default:
      role = null;
  }
  return role;
}

const addOneUser = async (type, code, name, email, gender, picture) => {
  const User = getRoleFromType(type);

  const user = await User.create({
    code, name, email, gender, picture,
  });

  return user;
};

const findOneByCode = async (type, code) => {
  const User = getRoleFromType(type);

  const user = await User.findOne({ code });

  return user;
};

const updateOneByCode = async (type, code, name, email, gender, picture) => {
  const User = getRoleFromType(type);

  const user = await User.updateOne({ code }, {
    name, email, gender, picture,
  });

  return user;
};

const listUserByType = async (type) => {
  const User = getRoleFromType(type);

  const user = await User.find({});

  return user;
};

module.exports = {
  list,
  insert,
  remove,
  update,
  getUser,
  editProfile,
  addOneUser,
  findOneByCode,
  listUserByType,
  updateOneByCode,
};
