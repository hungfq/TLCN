/* eslint-disable max-len */
const {
  insertTopic, listTopic, updateOneTopic, deleteOneTopic,
  findOneTopic, searchTopic, updateTopicStudent, updateTopicLecturer,
  addProposalTopic, listProposalTopic, approveProposalTopic, removeProposalTopic,
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

  app.post('/v1/topic-proposal', isAuth, addProposalTopic);
  app.get('/v1/topic-proposal', isAuth, listProposalTopic);
  app.post('/v1/topic-proposal/approve/:id', isAuth, approveProposalTopic);
  app.delete('/v1/topic-proposal/:id', isAuth, removeProposalTopic);
};

module.exports = router;
