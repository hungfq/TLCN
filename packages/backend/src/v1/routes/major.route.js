const {
  create, list, update,
} = require('../controller/major.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/v1/majors', list);
  app.post('/v1/majors', isAuth, permit('major.create'), create);
  app.put('/v1/majors/:id', isAuth, permit('major.update'), update);
};

module.exports = router;
