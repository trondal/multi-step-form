import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { createFileStmt, createUserStmt } from '../db/queries.js';
import type { CombinedCheckoutType } from '../../validators/schema.js';

export const uploadRouter = Router();

// field name must match the client: "file"
uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'No file uploaded' });
  }
  const buffer = Buffer.from(req.file.path);
  const user: CombinedCheckoutType = req.body;

  // Missing transactions, missing console.log statemenets for each query.
  const fileResult = createFileStmt.run({
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    destination: req.file.destination,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    file: buffer
  });

  const userResult = createUserStmt.run({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    country: user.country,
    city: user.city,
    shippingAddress: user.shippingAddress,
    fileId: fileResult.lastInsertRowid,
    cardNumber: user.cardNumber,
    cardholderName: user.cardholderName,
    cvv: user.cvv
  });

  return res.json({
    ok: true,
    fileId: fileResult.lastInsertRowid,
    userId: userResult.lastInsertRowid
  });
});
