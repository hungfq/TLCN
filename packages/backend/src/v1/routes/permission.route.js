const {
  create,
  list,
} = require('../controller/permission.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/permissions', create); // TODO: block this api

  app.get('/v1/permissions', isAuth, permit('permission.list'), list);
};

module.exports = router;
