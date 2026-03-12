import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uploadRouter } from './router/upload';
import { getFiles } from './db/queries';

const app = express();
const PORT = Number(process.env.API_PORT ?? 5174);

// Useful when running Vite dev server on 5173
app.use(
  cors({
    origin: ['http://localhost:5173']
  })
);

// Optional health check
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

export type FileResult = Express.Multer.File & { id: number };

// field name must match the client: "file"
app.get('/files', (_req, res) => {
  // Missing transactions, missing console.log statemenets for each query.

  type FileResult = Express.Multer.File & { id: number };
  const fileResults = getFiles.all() as unknown as FileResult[];

  console.log(fileResults);

  const json = fileResults.map((file) => {
    return {
      id: file?.id,
      fieldName: file?.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size
    };
  });

  res.json(json);
});

// Routes
app.use('/api', uploadRouter);

// Serve uploaded files statically (optional)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.listen(PORT, () => {
  console.log(`[api] Express listening on http://localhost:${String(PORT)}`);
});
