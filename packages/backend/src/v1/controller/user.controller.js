/* eslint-disable max-len */
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

module.exports = {
  index,
  loginWithEmail,
};
