const {
  insertTopic, listTopic, updateTopic, deleteTopic, findOneTopic,
} = require('../controller/topic.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/topic', isAuth, permit('topic.create'), insertTopic);
  app.get('/v1/topic/:id', isAuth, permit('topic.view'), findOneTopic);
  app.get('/v1/topic', isAuth, permit('topic.list'), listTopic);
  app.put('/v1/topic/:id', isAuth, permit('topic.update'), updateTopic);
  app.delete('/v1/topic/:id', isAuth, permit('topic.delete'), deleteTopic);
};

module.exports = router;
