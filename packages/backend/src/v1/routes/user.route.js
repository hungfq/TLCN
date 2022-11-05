const {
  listUser,
  loginWithEmail,
  getUserInfo,
} = require('../controller/user.controller');

const router = (app) => {
  app.get('/v1/user', listUser); // show list of all versions
  app.get('/checkstatus', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });
  app.post('/v1/login', loginWithEmail);
  app.get('/v1/user/:id', getUserInfo);
};

module.exports = router;
