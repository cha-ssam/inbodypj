const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ 
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const pythonScript = path.join(__dirname, 'ocr.py');

  console.log(`Processing file: ${filePath}`);
  console.log(`File type: ${req.file.mimetype}`);
  console.log(`Original file name: ${req.file.originalname}`);
  console.log(`Stored file name: ${req.file.filename}`);

  // 확인을 위해 파일 존재 여부 체크
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    res.status(500).json({ error: 'Uploaded file does not exist' });
    return;
  }

  execFile('python3', [pythonScript, filePath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      res.status(500).json({ error: 'OCR processing failed' });
      return;
    }
    console.log(`OCR Result: ${stdout.trim()}`);
    res.json({ text: stdout.trim() });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 