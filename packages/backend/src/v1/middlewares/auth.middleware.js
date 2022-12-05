/* eslint-disable no-console */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const _Admin = require('../models/admin.model');
const _Lecturer = require('../models/lecturer.model');
const _Student = require('../models/student.model');

const secretKey = process.env.JWT_SECRET_KEY;

async function validateEmail(email, role) {
  let user = null;
  if (role === 'STUDENT') user = await _Student.findOne({ email });
  else if (role === 'LECTURER') user = await _Lecturer.findOne({ email });
  else if (role === 'ADMIN') user = await _Admin.findOne({ email });
  if (user) {
    return { ...user._doc, role };
  }
  return { user, role: null };
}

exports.isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secretKey, async (err, user) => {
    if (err) return res.sendStatus(403);

    const userInfo = await validateEmail(user.email, user.role);

    if (!userInfo.email) {
      return res.status(403).send('email does not exist');
    }

    req.user = userInfo;

    return next();
  });
};
