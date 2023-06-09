import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const dataRouter = Router();
const __dirname = path.resolve();

dataRouter.get('/data/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, `../data/${filename}`);
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read file' });
      } else {
        try {
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        } catch (error) {
          res.status(500).json({ error: 'Failed to parse JSON' });
        }
      }
    });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

export { dataRouter };
