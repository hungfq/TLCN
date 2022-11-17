/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const _Admin = require('../models/admin.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');

const client = new OAuth2Client();
const secretKey = process.env.JWT_SECRET_KEY;

async function verifyToken(token) {
  client.setCredentials({ access_token: token });
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
  });
  return userinfo.data;
}

async function validateEmail(email) {
  let user = null;
  user = await _Admin.findOne({ email });
  if (user) return { user, role: 'ADMIN' };
  user = await _Lecturer.findOne({ email });
  if (user) return { user, role: 'LECTURER' };
  user = await _Student.findOne({ email });
  return { user, role: 'STUDENT' };
}

const loginWithGoogle = async (req, res, next) => {
  try {
    const { access_token } = req.body;
    const userInfo = await verifyToken(access_token);
    if (!userInfo || !userInfo.email) {
      return res.status(401).send({ message: 'Not valid data' });
    }
    const { email } = userInfo;
    const { user, role } = await validateEmail(email);
    if (!user) {
      return res.status(401).send({ message: 'The email is not exist' });
    }
    const token = jwt.sign({ email }, secretKey, {
      expiresIn: '720h',
    });

    return res.status(200).send({ userInfo: user, role, accessToken: token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginWithGoogle,
};
