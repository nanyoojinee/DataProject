import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const dataRouter = Router();

fs.readFile('data/global-plastics-production.json', 'UTF-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  dataRouter.get('/plasticData', (req, res, next) => {
    res.json({ data });
  });
});

fs.readFile('data/waste.json', 'UTF-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  dataRouter.get('/wasteData', (req, res, next) => {
    res.json({ data });
  });
});

export { dataRouter };
