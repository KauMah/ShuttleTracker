import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello there');
});

router.post('/', (req: Request, res: Response) => {
  console.log(JSON.stringify(req.body));
  res.send("Ok Got it");
});

export default router;
