const {
  insertTopic, listTopic, updateOneTopic, deleteOneTopic,
  findOneTopic, searchTopic, updateTopicStudent, updateTopicLecturer,
} = require('../controller/topic.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/topic', isAuth, insertTopic);
  app.get('/v1/topic/:id', isAuth, findOneTopic);
  app.put('/v1/topic/:id', isAuth, updateOneTopic);
  app.delete('/v1/topic/:id', isAuth, deleteOneTopic);
  app.get('/v1/topic-search', isAuth, searchTopic);
  app.put('/v1/topic-student/:id', isAuth, updateTopicStudent);
  app.put('/v1/topic-lecturer/:id', isAuth, updateTopicLecturer);
  app.get('/v1/topic', listTopic); // public api in homepage
};

module.exports = router;
