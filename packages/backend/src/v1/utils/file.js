const multer = require('multer');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const excelToJson = (path) => {
  const workbook = xlsx.readFile(path);
  const sheetNameList = workbook.SheetNames;
  return xlsx.utils.sheet_to_json(
    workbook.Sheets[sheetNameList[0]],
  );
};

module.exports = {
  upload,
  excelToJson,
};
