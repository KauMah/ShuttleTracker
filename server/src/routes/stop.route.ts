import express, { Request, Response } from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import stopModel from '../models/stop.model';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router.get('/', (req: Request, res: Response) => {
  stopModel.create({ name: 'bloop', loc: [20, 20] });
  res.status(200).json({ status: 'success' });
});

export default router;
