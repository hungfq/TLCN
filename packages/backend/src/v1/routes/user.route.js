const {
  list,
  findOne,
  update,
  viewProfile,
  editProfile,
  addOneUser,
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
  app.get('/v1/user', isAuth, permit('user.list'), list);
  app.get('/v1/user/:id', isAuth, permit('user.view'), findOne);
  app.put('/v1/user/:id', isAuth, permit('user.update'), update);

  app.get('/v1/profile', isAuth, permit('profile.view'), viewProfile);
  app.post('/v1/profile', isAuth, permit('profile.edit'), editProfile);
  app.post('/v1/users', addOneUser); // only admin
};

module.exports = router;
