/* eslint-disable max-len */
const OtpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const _Otp = require('../models/otp.model');
const _User = require('../models/user.model');
// service
const {
  insertOtp,
  validOtp,
} = require('./otp.service');
const {
  sendEmail,
} = require('../utils/sendmail');

const sendOTP = async (email) => {
  console.log('🚀 ~ file: auth.service.js ~ line 4 ~ sendOTP ~ email', email);

  const OTP = OtpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const resultInsertOTP = await insertOtp(email, OTP);
  if (resultInsertOTP) await sendEmail(email, OTP);
};

const verifyOTP = async (email, otp) => {
  try {
    const otpHolder = await _Otp.find({ email });
    if (!otpHolder.length) {
      return {
        code: 404,
        message: 'Expired OTP',
      };
    }
    // get last otp
    const lastOtp = otpHolder[otpHolder.length - 1];
    const isValid = await validOtp(otp, lastOtp.otp);
    if (!isValid) {
      return {
        code: 401,
        message: 'Invalid OTP',
      };
    }
    if (isValid && email === lastOtp.email) {
      const user = await _User.findOne({ email });
      if (!user) {
        await _User.create({
          firstName: '',
          lastName: '',
          sex: 'male',
          email: lastOtp.email,
        });
      }
      const token = jwt.sign({ email }, 'SecretKey', {
        expiresIn: '24h', // it will be expired after 10 hours
      });
      await _Otp.deleteMany({ email });
      return {
        code: 200,
        access_token: token,
      };
    }
  } catch (error) {
    console.error(error);
    return { code: 500, message: error.message };
  }
};
module.exports = {
  sendOTP,
  verifyOTP,
};
