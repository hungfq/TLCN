/* eslint-disable max-len */
const {
  createNewTask,
  getOneTask,
  updateOneTask,
  updateStatusTask,
  listTaskByTopic,
  updateAssignTo,
  updateInfo,
  getCommentTask,
  addCommentTask,
  deleteCommentTask,
  deleteTask,
  taskStatistics,
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
  app.put('/v1/task-status/:id', isAuth, updateStatusTask);
  app.put('/v1/task-assign/:id', isAuth, updateAssignTo);
  app.put('/v1/task-info/:id', isAuth, updateInfo);
  app.get('/v1/task-comment/:id', isAuth, getCommentTask);
  app.post('/v1/task-comment/:id', isAuth, addCommentTask);
  app.delete('/v1/task-comment/:id', isAuth, deleteCommentTask);
  app.delete('/v1/task/:id', isAuth, deleteTask);

  app.get('/v1/task-statistics/:topicId', isAuth, taskStatistics);
};

module.exports = router;
