/* eslint-disable no-console */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const _User = require('../models/user.model');

const secretKey = process.env.JWT_SECRET_KEY;

exports.isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, async (err, user) => {
    // console.log(err);

    if (err) return res.sendStatus(403);

    const userInfo = await _User.findOne({ email: user.email });

    req.user = userInfo;

    return next();
  });
};
