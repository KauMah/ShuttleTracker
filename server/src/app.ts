import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log(`Hello ${JSON.stringify(req.body)}`);
  res.send('hello');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
