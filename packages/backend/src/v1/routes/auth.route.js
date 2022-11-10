const {
  loginWithGoogle,
} = require('../controller/auth.controller');

const router = (app) => {
  app.post('/v1/auth', loginWithGoogle);
};

module.exports = router;
