/* eslint-disable max-len */

const fileUtils = require('../utils/file');
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
      return res.status(422).send('Type error');
    }
    if (!code) {
      return res.status(422).send('Code is required');
    }
    if (!email) {
      return res.status(422).send('Email is required');
    }
    if (!constant.genders.includes(gender)) {
      return res.status(422).send('Gender is invalid');
    }
    let user = await userService.findOneByCode(type, code);
    if (user) {
      return res.status(400).send('User already exist');
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
      return res.status(404).send('Not found');
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
    if (!code) {
      return res.status(422).send('Code is required');
    }
    if (!email) {
      return res.status(422).send('Email is required');
    }
    if (!constant.genders.includes(gender)) {
      return res.status(422).send('Gender is invalid');
    }
    const user = await userService.findOneByCode(type, code);
    if (!user) {
      return res.status(404).send('Not found');
    }
    await userService.updateOneByCode(type, code, name, email, gender, picture);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listUserByType = async (req, res, next) => {
  try {
    const { type } = req.query;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('Type error');
    }
    const user = await userService.listUserByType(type);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const importUser = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (!constant.roles.includes(type)) {
      return res.status(422).send('Type error');
    }
    const jsonData = fileUtils.excelToJson(req.file.path);
    jsonData.forEach(async (user) => {
      await userService.upsertOne(type, user.CODE, user.NAME, user.EMAIL, user.GENDER);
    });
    return res.status(201).send('Successfully');
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
  importUser,
};
