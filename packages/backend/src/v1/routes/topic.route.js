/* eslint-disable max-len */
const fs = require('fs');
const { upload } = require('../utils/file');
const {
  importTopics, insertTopic, listTopic, updateOneTopic, deleteOneTopic,
  findOneTopic, searchTopic, updateTopicStudent, updateTopicLecturer,
  addProposalTopic, listProposalTopic, approveProposalTopic, removeProposalTopic,
  listTopicReviewByLecturer, listTopicProposalByCreatedId, updateProposalByUser,
  approveProposalByLecturer,
} = require('../controller/topic.controller');

const authMiddleware = require('../middlewares/auth.middleware');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/topic-import/', upload.single('xlsx'), importTopics);
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
  app.put('/v1/topic-proposal/:id', isAuth, updateProposalByUser);
  app.get('/v1/topic-proposal/lecturer', isAuth, listTopicReviewByLecturer);
  app.get('/v1/approve/:id', isAuth, approveProposalByLecturer);
  app.get('/v1/topic-proposal/created', isAuth, listTopicProposalByCreatedId);
  app.get('/template/Topic', (req, res) => {
    const file = fs.createReadStream('public/template/TopicTemplate.xlsx');
    const stat = fs.statSync('public/template/TopicTemplate.xlsx');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=Topic.xlsx');
    file.pipe(res);
  });
};

module.exports = router;
