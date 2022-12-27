/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const _Admin = require('../models/admin.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');
const notifyService = require('../services/notification.service');

const { getIo } = require('../socket');

const client = new OAuth2Client();
const secretKey = process.env.JWT_SECRET_KEY;

async function verifyToken(token) {
  client.setCredentials({ access_token: token });
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
  });
  return userinfo.data;
}

async function validateEmail(email, role) {
  let user = null;
  if (role === 'STUDENT') user = await _Student.findOne({ email });
  else if (role === 'LECTURER') user = await _Lecturer.findOne({ email });
  else if (role === 'ADMIN') user = await _Admin.findOne({ email });

  return { user, role };
}

const loginWithGoogle = async (req, res, next) => {
  try {
    const { access_token, type } = req.body;
    const userInfo = await verifyToken(access_token);
    if (!userInfo || !userInfo.email) {
      return res.status(401).send({ message: 'Not valid data' });
    }
    const { email } = userInfo;
    const { user, role } = await validateEmail(email, type);
    if (!user) {
      return res.status(401).send({ message: 'The email is not exist' });
    }
    user.picture = userInfo.picture;
    user.save();

    const token = jwt.sign({ email, role }, secretKey, {
      expiresIn: '720h',
    });

    return res.status(200).send({ userInfo: user, role, accessToken: token });
  } catch (err) {
    next(err);
  }
};

const getNotification = async (req, res, next) => {
  try {
    const notify = await notifyService.getMultiNotify(req.user.notificationIds);
    return res.status(200).send(notify);
  } catch (err) {
    next(err);
  }
};

const readNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await notifyService.readNotify(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await notifyService.deleteNotify(id, req.user._id);
    return res.status(200).send('Successfully');
  } catch (err) {
    next(err);
  }
};

const test = async (req, res) => {
  // const socketId = await notifyService.getSocketIdByUserId('6375b66924ace35d440f51ed');
  await getIo().emit('task', 'notify send by server');
  return res.sendStatus(200);
};

module.exports = {
  loginWithGoogle,
  getNotification,
  readNotification,
  deleteNotification,
  test,
};
