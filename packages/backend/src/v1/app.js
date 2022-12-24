/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const http = require('http');

const { createSocket } = require('./socket');
const { createRedis } = require('./redis');
const AccessDenied = require('./utils/errors/AppError');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const scheduleRoutes = require('./routes/schedule.route');
const topicRoutes = require('./routes/topic.route');
const taskRoutes = require('./routes/task.route');
const committeeRoutes = require('./routes/committee.route');

const app = express();
const server = http.createServer(app);
createSocket(server);
createRedis();

app.use(bodyParser.json());

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Max-Age', 3600);
  next();
});

// add router
authRoutes(app);
userRoutes(app);
scheduleRoutes(app);
topicRoutes(app);
taskRoutes(app);
committeeRoutes(app);

// handle error controller
// need exactly 4 params for express to recognize
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

module.exports = server;
