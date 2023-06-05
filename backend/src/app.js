import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { groupRouter } from './routers/groupRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

app.get('/getdata', (req, res) => {
  // JSON 파일의 경로
  const jsonPath = path.join(__dirname, 'data', 'output.json');

  res.status(200).json(require(jsonPath));
  console.log('1');
  return;
});
app.use(userAuthRouter);
app.use(groupRouter);

app.use(errorMiddleware);

export { app };
