const {
  viewProfile,
  addOneUser,
  listUserByType,
  findOneByCode,

  updateOneByCode,
} = require('../controller/user.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/check-status', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });

  app.post('/v1/user', addOneUser); // only admin
  app.get('/v1/user/:code', isAuth, findOneByCode);
  app.get('/v1/user/', isAuth, listUserByType);
  app.put('/v1/user/:code', updateOneByCode);
  app.get('/v1/profile', isAuth, permit('profile.view'), viewProfile);
};

module.exports = router;
