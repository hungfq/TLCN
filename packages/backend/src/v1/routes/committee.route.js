const fs = require('fs');
const {
  insertCommittee,
  updateCommittee,
  deleteCommittee,
  listCommittee,
  importCommittee,
} = require('../controller/committee.controller');

const { upload } = require('../utils/file');

const authMiddleware = require('../middlewares/auth.middleware');

const { isAuth } = authMiddleware;

const router = (app) => {
  app.post('/v1/committee', isAuth, insertCommittee);
  app.get('/v1/committee/', isAuth, listCommittee);
  app.put('/v1/committee/:id', isAuth, updateCommittee);
  app.delete('/v1/committee/:id', isAuth, deleteCommittee);

  app.get('/template/Committee', (req, res) => {
    const file = fs.createReadStream('public/template/CommitteeTemplate.xlsx');
    const stat = fs.statSync('public/template/CommitteeTemplate.xlsx');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=Committee.xlsx');
    file.pipe(res);
  });

  app.post('/v1/committee-import/', upload.single('xlsx'), importCommittee);
};

module.exports = router;
