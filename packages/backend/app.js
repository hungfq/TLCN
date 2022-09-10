const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const AccessDenied = require('./api/utils/errors/AccessDenied');
const userRoutes = require('./api/routes/user');

const app = express();

app.use(bodyParser.json());

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Max-Age', 3600);
  next();
});

// add router
userRoutes(app);

// handle error controller
// need exactly 4 params for express to regconize
// http://expressjs.com/en/guide/error-handling.html#the-default-error-handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.log(JSON.stringify({ stack: err.stack, message: err.message }));
  if (res.headerSent) return next(err);
  const errorType = _.get(err, 'constructor.name', 'Error');
  switch (errorType) {
    // case DbdiagramError.name:
    //   return res.sendStatus(403);
    case AccessDenied.name:
      return res.status(err.status).send(err.message);
    default:
      return res.sendStatus(500);
  }
});

module.exports = app;
