/* eslint-disable max-len */
const {
  create,
  list,
  getPermissions,
  syncPermissions,
} = require('../controller/role.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/roles', create); // TODO: block this api

  app.get('/v1/roles', isAuth, permit('role.list'), list);
  // app.get('/v1/roles/:id/permissions', isAuth, permit('role.view'), getPermissions);
  app.get('/v1/roles/:id/permissions', getPermissions);
  app.post('/v1/roles/:id/permissions', isAuth, permit('role.sync'), syncPermissions);
};

module.exports = router;
