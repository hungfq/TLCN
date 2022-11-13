/* eslint-disable max-len */
const {
  viewRegistration,
  registrationTopic,
  cancelRegistration,
  list,
  create,
  update,
  remove,
} = require('../controller/registration.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/v1/registration', isAuth, permit('registration.list'), list);
  app.post('/v1/registration', isAuth, permit('registration.create'), create);
  app.put('/v1/registration/:id', isAuth, permit('registration.update'), update);
  app.delete('/v1/registration/:id', isAuth, permit('registration.delete'), remove);

  app.get('/v1/register', isAuth, permit('register.view'), viewRegistration);
  app.post('/v1/register', isAuth, permit('register.create'), registrationTopic);
  app.delete('/v1/register/:id', isAuth, permit('register.delete'), cancelRegistration);
};

module.exports = router;
