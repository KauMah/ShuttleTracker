import { addStopHandler, editStopHandler } from '../controllers/stop.controller';
import express, { Request, Response } from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import stopModel from '../models/stop.model';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/new', restrictTo('admin'), addStopHandler);

router.post('/edit', restrictTo('admin'), editStopHandler);

export default router;
