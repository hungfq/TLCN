/* eslint-disable max-len */
const {
  createOne,
  findOne,
  listSchedules,
  updateOne,
  importStudents,
  listStudents,
  importTopics,
  listTopics,
  register,
  cancelRegister,
  removeSchedule,
} = require('../controller/schedule.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middleware');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/schedule', isAuth, createOne);
  app.get('/v1/schedule', isAuth, listSchedules);
  app.get('/v1/schedule/:id', isAuth, findOne);
  app.put('/v1/schedule/:id', isAuth, updateOne);
  app.delete('/v1/schedule/:id', isAuth, removeSchedule);
  app.post('/v1/schedule/:id/student', upload.single('xlsx'), importStudents);
  app.get('/v1/schedule/:id/student', isAuth, listStudents);
  app.post('/v1/schedule/:id/topic', upload.single('xlsx'), importTopics);
  app.get('/v1/schedule/:id/topic', isAuth, listTopics);

  app.post('/v1/schedule/:id/topic/:topicId/register', isAuth, register);
  app.delete('/v1/schedule/:id/topic/:topicId/register', isAuth, cancelRegister);
};

module.exports = router;
