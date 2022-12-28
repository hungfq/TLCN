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

const findOneModelWithOnlyId = async (_id) => {
  let user = null;
  user = await _Admin.findById(_id);
  if (user) return user;
  user = await _Lecturer.findById(_id);
  if (user) return user;
  user = await _Student.findById(_id);
  if (user) return user;

  return user;
};

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

const addNotificationByType = async (type, _id, notificationId) => {
  const User = getRoleFromType(type);

  const user = await User.findOne({ _id });
  let notificationIds = [...user.notificationIds];
  notificationIds = [notificationId, ...notificationIds];
  await User.updateOne({ _id }, { notificationIds });

  return user;
};

const addNotification = async (_id, notificationId) => {
  const user = await findOneModelWithOnlyId(_id);

  const notificationIds = [...user.notificationIds];
  user.notificationIds = [notificationId, ...notificationIds];
  await user.save();
};

const removeNotification = async (_id, notificationId) => {
  const user = await findOneModelWithOnlyId(_id);
  const notificationIds = [...user.notificationIds];

  const newList = notificationIds.filter(
    (e) => e.toString() !== notificationId.toString(),
  );
  user.notificationIds = newList;
  await user.save();
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

const getAllAdmin = async () => {
  const user = await _Admin.find({});
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
  await User.updateOne(query, upsert, options);
};

module.exports = {
  addOneUser,
  findOneByCode,
  listUserByType,
  updateOneByCode,
  addNotification,
  removeNotification,
  addNotificationByType,
  getStudentByCodes,
  findOneWithOnlyId,
  getAllAdmin,
  upsertOne,
};
