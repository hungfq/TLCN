require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
require('../../src/v1/models/user.model');
require('../../src/v1/models/otp.model');
require('../../src/v1/models/permission.model');
require('../../src/v1/models/registration.model');
require('../../src/v1/models/role.model');
require('../../src/v1/models/topic.model');

afterAll(async () => {
  await mongoose.disconnect();
});

// eslint-disable-next-line import/no-dynamic-require
const { mongoUrl } = require(path.join(__dirname, '../../mongo_config'));
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {

  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
