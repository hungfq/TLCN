const {
  loginWithGoogle,
  getNotification,
  readNotification,
} = require('../controller/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.post('/v1/auth', loginWithGoogle);

  app.get('/v1/notification', isAuth, getNotification);
  app.post('/v1/notification/:id/read', isAuth, readNotification);
};

module.exports = router;
