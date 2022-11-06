/* eslint-disable no-console */
/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const _User = require('../models/user.model');

const {
  sendOTP,
  verifyOTP,
} = require('../services/auth.service');

const index = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sendOTP(email);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

const loginWithEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    // console.log('🚀 ~ file: user.controller.js ~ line 20 ~ loginWithEmail ~  email, otp', email, otp);
    const value = await verifyOTP(email, otp);
    console.log('🚀 ~ file: user.controller.js ~ line 23 ~ loginWithEmail ~ value', value);
    return res.status(value.code).send(value.message ? value.message : value.access_token);
  } catch (err) {
    return next(err);
  }
};

const loginWithGoogle = async (req, res, next) => {
  try {
    const {
      email, name, picture, hd,
    } = req.body;
    const user = await _User.findOne({ email });
    if (!user) {
      await _User.create({
        firstName: name,
        lastName: '',
        sex: 'male',
        email,
        code: email,
      });
    }
    console.log('here');
    const token = jwt.sign({ email }, 'SecretKey', {
      expiresIn: '24h', // it will be expired after 10 hours
    });
    console.log(token);
    return res.status(200).send(token);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
  loginWithEmail,
  loginWithGoogle,
};
