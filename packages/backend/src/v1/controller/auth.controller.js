/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const _User = require('../models/user.model');

const listEmailAdmins = new Set([
  'lequocbao29072001@gmail.com',
  'quanghungpham07@gmail.com',
  'bao.lq@holistics.io',
]);
const secretKey = process.env.JWT_SECRET_KEY;

const client = new OAuth2Client();

// Call this function to validate OAuth2 authorization code sent from client-side
async function verifyToken(token) {
  client.setCredentials({ access_token: token });
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
  });
  return userinfo.data;
}

function validateEmail(email, hd) {
  let role = null;
  if (listEmailAdmins.has(email)) role = 'ADMIN';
  else if (hd === 'hcmute.edu.vn') role = 'TEACHER';
  else if (hd === 'student.hcmute.edu.vn') role = 'STUDENT';
  return role;
}

const loginWithGoogle = async (req, res, next) => {
  try {
    const {
      access_token,
    } = req.body;
    const userInfo = await verifyToken(access_token);
    const {
      email,
      name,
      picture,
      hd,
    } = userInfo;
    const role = validateEmail(email, hd);
    if (!role) {
      return res.status(401).send(
        { message: 'The email not exist in organization' },
      );
    }
    const user = await _User.findOne({ email });
    const token = jwt.sign({ email }, secretKey, {
      expiresIn: '24h',
    });
    if (!user) {
      const newUser = await _User.create({
        name,
        email,
        code: email,
        picture,
        role,
      });
      return res.status(200).send({ userInfo: newUser, accessToken: token });
    }
    return res.status(200).send({ userInfo: user, accessToken: token });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  loginWithGoogle,
};
