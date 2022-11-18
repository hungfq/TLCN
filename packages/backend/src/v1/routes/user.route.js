const fs = require('fs');
const {
  viewProfile,
  addOneUser,
  listUserByType,
  findOneByCode,
  updateOneByCode,
  importUser,
} = require('../controller/user.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middlewares');
// const roleMiddleware = require('../middlewares/role.middlewares');

const { isAuth } = authMiddleware;
// const { permit } = roleMiddleware;

const router = (app) => {
  app.get('/check-status', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'api ok',
    });
  });

  app.post('/v1/user', isAuth, addOneUser); // only admin
  app.get('/v1/user/:code', isAuth, findOneByCode);
  app.get('/v1/user/', isAuth, listUserByType);
  app.put('/v1/user/:code', isAuth, updateOneByCode);
  app.get('/v1/profile', isAuth, viewProfile);

  app.get('/template/User', (req, res) => {
    const file = fs.createReadStream('public/template/UserTemplate.xlsx');
    const stat = fs.statSync('public/template/UserTemplate.xlsx');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=User.xlsx');
    file.pipe(res);
  });

  app.post('/v1/user-import/', upload.single('xlsx'), importUser);
};

module.exports = router;
