const {
  list,
  findOne,
  update,
} = require('../controller/user.controller');

const router = (app) => {
  app.get('/check-status', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });
  app.get('/v1/user', list);
  app.get('/v1/user/:id', findOne);
  app.put('/v1/user/:id', update);
};

module.exports = router;
