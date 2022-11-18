const _Admin = require('../models/admin.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');

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

const getStudentByCodes = async (students) => {
  const studentList = _Student.find({ code: { $in: students } })
    .select('code name email');
  return studentList;
};

const findOneWithOnlyId = async (_id) => {
  let user = null;
  user = await _Admin.findOne({ _id });
  if (user) return { ...user._doc, role: 'ADMIN' };
  user = await _Lecturer.findOne({ _id });
  if (user) return { ...user._doc, role: 'LECTURER' };
  user = await _Student.findOne({ _id });
  if (user) return { ...user._doc, role: 'STUDENT' };

  return user;
};

const upsertOne = async (type, code, name, email, gender) => {
  const User = getRoleFromType(type);

  const query = { code };
  const upsert = {
    $set: {
      code, name, email, gender, notificationIds: [], picture: null,
    },
  };
  const options = { upsert: true };
  const user = await User.updateOne(query, upsert, options);

  return user;
};

module.exports = {
  addOneUser,
  findOneByCode,
  listUserByType,
  updateOneByCode,
  getStudentByCodes,
  findOneWithOnlyId,
  upsertOne,
};
