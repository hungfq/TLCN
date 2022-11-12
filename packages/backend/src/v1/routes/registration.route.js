const {
  registrationTopic,
  cancelRegistration,
  list,
  create,
  update,
  remove,
} = require('../controller/registration.controller');

const authMiddleware = require('../middlewares/auth.middlewares');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.get('/v1/registration', isAuth, list);
  app.post('/v1/registration', isAuth, create);
  app.put('/v1/registration/:id', isAuth, update);
  app.delete('/v1/registration/:id', isAuth, remove);

  app.post('/v1/register', isAuth, registrationTopic);
  app.delete('/v1/register/:id', isAuth, cancelRegistration);
};

module.exports = router;
