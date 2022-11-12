const _Permission = require('../models/permission.model');

const create = async (name) => {
  const check = await _Permission.findOne({ name });
  if (check) {
    return check;
  }
  const permission = await _Permission.create({
    name,
  });
  return permission;
};

const list = async () => {
  const permissions = await _Permission.find({});
  return permissions;
};

module.exports = {
  create,
  list,
};
