/* eslint-disable max-len */
const {
  createOne,
  listSchedules,
  updateOne,
  importStudents,
  listStudents,
  importTopics,
  listTopics,
} = require('../controller/schedule.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middlewares');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/schedule', isAuth, createOne);
  app.get('/v1/schedule', isAuth, listSchedules);
  app.put('/v1/schedule/:id', isAuth, updateOne);
  app.post('/v1/schedule/:id/student', upload.single('xlsx'), importStudents);
  app.get('/v1/schedule/:id/student', isAuth, listStudents);
  app.post('/v1/schedule/:id/topic', upload.single('xlsx'), importTopics);
  app.get('/v1/schedule/:id/topic', isAuth, listTopics);
};

module.exports = router;
