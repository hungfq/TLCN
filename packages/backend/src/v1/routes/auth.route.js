const {
  loginWithGoogle,
} = require('../controller/user.controller');

const router = (app) => {
  app.post('/v1/auth', loginWithGoogle);
};

module.exports = router;
