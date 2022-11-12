const _Role = require('../models/role.model');
const _RolePermission = require('../models/role_has_permissions.model');

const create = async (name, description) => {
  const check = await _Role.findOne({ name });
  if (check) {
    return check;
  }
  const role = await _Role.create({
    name,
    description,
  });
  return role;
};

const list = async () => {
  const roles = await _Role.find({});
  return roles;
};

const getPermissions = async (roleId) => {
  const permissions = await _RolePermission.find({ roleId })
    .populate({ path: 'permissionId', select: 'name _id' });
  return permissions;
};

const sync = async (roleId, permissions) => {
  await _RolePermission.deleteMany({ roleId });

  await Promise.all(permissions.map((permissionId) => _RolePermission.create({
    roleId, permissionId,
  })));
};

const findOne = async (name) => {
  const role = await _Role.findOne({ name });
  return role;
};

module.exports = {
  create,
  list,
  getPermissions,
  sync,
  findOne,
};
