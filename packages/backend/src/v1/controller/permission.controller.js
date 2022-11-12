const permissionService = require('../services/permission.service');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const permission = await permissionService.create(name);
    return res.status(201).send(permission);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const permissions = await permissionService.list();
    return res.status(200).send(permissions);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  list,
};
