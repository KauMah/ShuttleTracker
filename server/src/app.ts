import * as dotenv from 'dotenv';

import express, { NextFunction, Request, Response } from 'express';

import authRouter from './routes/auth.route';
import connectDB from './utils/connectDB';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './routes/user.route';

dotenv.config();
const DB_URI = process.env.MONGO_URL || '';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  // this is how you get access to the request body, similarly can get access to route params and cookies etc
  console.log(`Hello ${JSON.stringify(req.body)}`);
  // to access protected values from process.env (API_KEY or DB secret)
  // the .env file holds all of these values and it is NOT committed to github because that would be dangerous
  // console.log(process.env.TEST_VAL);
  // this is how an express route sends data back, although this is a really simple case - usually it sends some JSON
  res.send('hello');
});

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB(DB_URI);
});
