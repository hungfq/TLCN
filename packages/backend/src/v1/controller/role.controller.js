const roleService = require('../services/role.service');

const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const role = await roleService.create(name, description);
    return res.status(201).send(role);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const roles = await roleService.list();
    return res.status(200).send(roles);
  } catch (err) {
    return next(err);
  }
};

const getPermissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permissions = await roleService.getPermissions(id);
    return res.status(200).send(permissions);
  } catch (err) {
    return next(err);
  }
};

const syncPermissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;
    await roleService.sync(id, permissions);
    return res.status(200).send(permissions);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  list,
  getPermissions,
  syncPermissions,
};
