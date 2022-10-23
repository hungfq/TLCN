const bcrypt = require('bcrypt');
const _Otp = require('../models/otp.model');

const insertOtp = async (email, otp) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashOtp = await bcrypt.hash(otp.toString(), salt);
    const Otp = await _Otp.create({
      email,
      otp: hashOtp,
    });
    return Otp ? 1 : 0;
  } catch (e) {
    return console.error(e);
  }
};
const validOtp = async (rawOtp, hashOtp) => {
  try {
    const isValid = await bcrypt.compare(rawOtp, hashOtp);
    return isValid;
  } catch (error) {
    return console.error(error.message);
  }
};
module.exports = {
  insertOtp,
  validOtp,
};
