import * as dotenv from 'dotenv';

import express, { NextFunction, Request, Response } from 'express';

import connect from './config/mongoSetup';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import users from './routes/users';

dotenv.config();
const DB_URI = process.env.MONGO_URL || '';

connect(DB_URI);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  // this is how you get access to the request body, similarly can get access to route params and cookies etc
  console.log(`Hello ${JSON.stringify(req.body)}`);
  // to access protected values from process.env (API_KEY or DB secret)
  // the .env file holds all of these values and it is NOT committed to github because that would be dangerous
  console.log(process.env.TEST_VAL);
  // this is how an express route sends data back, although this is a really simple case - usually it sends some JSON
  res.send('hello');
});

app.use('/user', users);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
