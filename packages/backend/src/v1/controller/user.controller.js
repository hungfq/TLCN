/* eslint-disable no-console */
/* eslint-disable max-len */

const userService = require('../services/user.service');
const contanst = require('../contanst');

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const { roleId } = req.query;
    const user = await userService.list(roleId);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name, email, code, picture, roleId,
    } = req.body;
    await userService.update(id, name, email, code, picture, roleId);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const viewProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await userService.getUser(id);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const {
      name, code, sex,
    } = req.body;
    await userService.editProfile(id, name, code, sex);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const addOneUser = async (req, res, next) => {
  try {
    const {
      type, code, name, email, gender, picture,
    } = req.body;
    if (!contanst.roles.includes(type)) {
      return res.status(422).send('type error');
    }
    let user = await userService.findOneUser(type, code);
    if (user) {
      return res.status(400).send('user already exist');
    }
    user = await userService.addOneUser(type, code, name, email, gender, picture);
    return res.status(201).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  findOne,
  list,
  update,
  viewProfile,
  editProfile,
  addOneUser,
};
