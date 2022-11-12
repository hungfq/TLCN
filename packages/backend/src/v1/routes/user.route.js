const {
  list,
  findOne,
  update,
} = require('../controller/user.controller');

const authMiddleware = require('../middlewares/auth.middlewares');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.get('/check-status', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });
  app.get('/v1/user', isAuth, list);
  app.get('/v1/user/:id', isAuth, findOne);
  app.put('/v1/user/:id', isAuth, update);
};

module.exports = router;
