const {
  registrationTopic,
  cancelRegistration,
  list,
  create,
  update,
  remove,
} = require('../controller/registration.controller');

const router = (app) => {
  app.get('/v1/registration', list);
  app.post('/v1/registration', create);
  app.put('/v1/registration/:id', update);
  app.delete('/v1/registration/:id', remove);

  app.post('/v1/register', registrationTopic);
  app.delete('/v1/register/:id', cancelRegistration);
};

module.exports = router;
