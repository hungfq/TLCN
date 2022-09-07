import express from 'express';
import bodyParser from 'body-parser';

const path = require('path');
// Mapping the schemas in MongoDB into mongoose mode
require('./api/models');

// eslint-disable-next-line import/no-dynamic-require
const { mongoUrl } = require(path.join(__dirname, 'mongo_config.js'));

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// setup mongo
// mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected MongoDB');
  })
  .catch((err) => console.log.error(err));
// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Max-Age', 3600);
  next();
});
