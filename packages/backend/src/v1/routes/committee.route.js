const fs = require('fs');
const {
  insertCommittee,
  updateCommittee,
  deleteCommittee,
  listCommittee,
} = require('../controller/committee.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middleware');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.post('/v1/committee', isAuth, insertCommittee);
  app.get('/v1/committee/', isAuth, listCommittee);
  app.put('/v1/committee/:id', isAuth, updateCommittee);
  app.delete('/v1/committee/:id', isAuth, deleteCommittee);

  app.get('/template/User', (req, res) => {
    const file = fs.createReadStream('public/template/UserTemplate.xlsx');
    const stat = fs.statSync('public/template/UserTemplate.xlsx');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=User.xlsx');
    file.pipe(res);
  });

  // app.post('/v1/user-import/', upload.single('xlsx'), importUser);
};

module.exports = router;
