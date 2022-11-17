/* eslint-disable no-console */
/* eslint-disable max-len */

const userService = require('../services/user.service');
const constant = require('../constant');

const viewProfile = async (req, res, next) => {
  try {
    const { code, role } = req.user;
    const user = await userService.findOneByCode(role, code);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const addOneUser = async (req, res, next) => {
  try {
    const {
      type, code, name, email, gender, picture,
    } = req.body;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('type error');
    }
    let user = await userService.findOneByCode(type, code);
    if (user) {
      return res.status(400).send('user already exist');
    }
    user = await userService.addOneUser(type, code, name, email, gender, picture);
    return res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
};

const findOneByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { type } = req.query;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('type error');
    }
    const user = await userService.findOneByCode(type, code);
    if (!user) {
      return res.status(404).send('user not found');
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const updateOneByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const {
      type, name, email, gender, picture,
    } = req.body;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('type error');
    }
    let user = await userService.findOneByCode(type, code);
    if (!user) {
      return res.status(404).send('user not found');
    }
    user = await userService.updateOneByCode(type, code, name, email, gender, picture);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const listUserByType = async (req, res, next) => {
  try {
    const { type } = req.query;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('type error');
    }
    const user = await userService.listUserByType(type);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  viewProfile,
  addOneUser,
  findOneByCode,
  listUserByType,
  updateOneByCode,
};
