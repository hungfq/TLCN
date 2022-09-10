const { index } = require('../controller/user');

const router = (app) => {
  app.get('/user', index); // show list of all versions
};

module.exports = router;
