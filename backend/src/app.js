import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { groupRouter } from './routers/groupRouter.js';
import { groupJoinRouter } from './routers/groupJoinRouter.js';

import { activityRouter } from './routers/activityRouter.js';
import path from 'path';
import { dataRouter } from './routers/dataRouter.js';
import { boardRouter } from './routers/boardRouter.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

app.get('/getdata', (req, res) => {
  // JSON 파일의 경로
  const jsonPath = path.join(__dirname, 'data', 'output.json');

  res.status(200).json(require(jsonPath));
  return;
});

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`;
  const options = {
    root: path.join('../backend'),
  };
  res.sendFile(filePath, options);
});

app.use(userAuthRouter);
app.use(groupRouter);
app.use(groupJoinRouter);
app.use(activityRouter);
app.use(dataRouter);
app.use('/boards', boardRouter);

app.use(errorMiddleware);

export { app };
