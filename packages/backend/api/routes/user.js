const { index } = require('../controller/user');

const router = (app) => {
  // /versions?sourceId=1&sourceType=Query
  app.get('/user', index); // show list of all versions
};

module.exports = router;
