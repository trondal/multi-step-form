import { Router } from 'express';
import { upload } from '../middleware/multer.js';

export const uploadRouter = Router();

uploadRouter.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ ok: true, receivedData: req.body });
});

// field name must match the client: "file"
uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);

  if (!req?.file) {
    return res.status(400).json({ ok: false, error: 'No file uploaded' });
  }

  return res.json({
    ok: true,
    originalName: req.file.originalname,
    storedName: req.file.filename,
    size: req.file.size,
    mimeType: req.file.mimetype
  });
});
