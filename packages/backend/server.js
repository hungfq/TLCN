require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
// Mapping the schemas in MongoDB into mongoose mode
require('./api/models/index');
const app = require('./app');

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
app.listen(PORT, () => {
  console.log(`server started ${port}`);
});
