/* eslint-disable max-len */
const {
  createOne,
  findOne,
  listSchedules,
  updateOne,
  importStudents,
  importTopics,
  listScheduleTopicLecturer,
  listScheduleTopicLecturerShort,
  listTopicLecturer,
  register,
  cancelRegister,
  removeSchedule,
  getScheduleToday,
  excelExport,
  listScheduleApproveLecturer,
  listStudents,
} = require('../controller/schedule.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const { isAuth } = authMiddleware;
const { permit } = roleMiddleware;

const router = (app) => {
  app.post('/v1/schedule', isAuth, permit('ADMIN'), createOne);
  app.get('/v1/schedule/today', isAuth, getScheduleToday);
  app.get('/v1/schedule', isAuth, listSchedules);
  app.get('/v1/schedule/:id', isAuth, findOne);
  app.put('/v1/schedule/:id', isAuth, permit('ADMIN'), updateOne);
  app.delete('/v1/schedule/:id', isAuth, permit('ADMIN'), removeSchedule);
  app.post('/v1/schedule/:id/student', upload.single('xlsx'), importStudents);
  app.get('/v1/schedule/:id/student', isAuth, listStudents);
  app.post('/v1/schedule/:id/topic', upload.single('xlsx'), importTopics);
  // app.get('/v1/schedule/:id/topic', isAuth, listTopics);
  app.get('/v1/schedule-topic-lecturer', isAuth, listScheduleTopicLecturer); // only lecturer call
  app.get('/v1/schedule-topic-lecturer/short', isAuth, listScheduleTopicLecturerShort); // only lecturer call
  app.get('/v1/schedule/:id/topic-lecturer/:lecturerId', isAuth, listTopicLecturer);
  app.get('/v1/schedule-lecturer', isAuth, listScheduleApproveLecturer);

  app.post('/v1/schedule/:id/topic/:topicId/register', isAuth, register);
  app.delete('/v1/schedule/:id/topic/:topicId/register', isAuth, cancelRegister);

  app.get('/v1/schedule/:id/export', excelExport);
};

module.exports = router;
