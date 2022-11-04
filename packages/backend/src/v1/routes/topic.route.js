const {
  insertTopic, listTopic, updateTopic, deleteTopic, findOneTopic,
} = require('../controller/topic.controller');

const router = (app) => {
  app.post('/v1/topic', insertTopic);
  app.get('/v1/topic/:id', findOneTopic);
  app.get('/v1/topic', listTopic);
  app.put('/v1/topic/:id', updateTopic);
  app.delete('/v1/topic/:id', deleteTopic);
};

module.exports = router;
