require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
// Mapping the schemas in MongoDB into mongoose mode
// require('./src/v1/models/user.model');
const server = require('./src/v1/app');

const { PORT } = process.env;
// eslint-disable-next-line import/no-dynamic-require
const { mongoUrl } = require(path.join(__dirname, 'mongo_config.js'));

// setup mongo
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected MongoDB');
  })
  .catch((err) => console.log(err));

const port = PORT;
server.listen(PORT, () => {
  console.log(`server started ${port}`);
});
