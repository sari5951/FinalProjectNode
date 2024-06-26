const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// מיקום עבור קבצים שנשמרים
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // נמצא בתקיית המקור של הפרויקט שלך
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// מסלול קובץ POST
app.post('/upload', upload.single('file'), (req, res) => {
  // עבודה עם הקובץ שהועלה
  res.send('הקובץ הועלה בהצלחה');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
