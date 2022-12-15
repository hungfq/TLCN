/* eslint-disable max-len */
const {
  createNewTask,
  getOneTask,
  updateOneTask,
  updateProcess,
  updateStatusTask,
  listTaskByTopic,
  updateAssignTo,
  updateStartTime,
  updateEndTime,
  updateInfo,
  addCommentTask,
  deleteTask,
} = require('../controller/task.controller');

const authMiddleware = require('../middlewares/auth.middleware');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/v1/task', isAuth, listTaskByTopic);
  app.post('/v1/task', isAuth, createNewTask);
  app.get('/v1/task/:id', isAuth, getOneTask);
  app.put('/v1/task/:taskId', isAuth, updateOneTask);
  app.put('/v1/task-progress/:id', isAuth, updateProcess);
  app.put('/v1/task-status/:id', isAuth, updateStatusTask);
  app.put('/v1/task-assign/:id', isAuth, updateAssignTo);
  app.put('/v1/task-start-time/:id', isAuth, updateStartTime);
  app.put('/v1/task-end-time/:id', isAuth, updateEndTime);
  app.put('/v1/task-info/:id', isAuth, updateInfo);
  app.post('/v1/task-comment/:id', isAuth, addCommentTask);
  app.delete('/v1/task/:id', isAuth, deleteTask);
};

module.exports = router;
