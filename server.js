const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const pythonScript = path.join(__dirname, 'ocr.py');

  execFile('python3', [pythonScript, filePath], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      res.status(500).json({ error: 'OCR processing failed' });
      return;
    }
    res.json({ text: stdout.trim() });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
