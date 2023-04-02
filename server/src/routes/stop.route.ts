import { addStopHandler, deleteStopHandler, editStopHandler, getStopHandler } from '../controllers/stop.controller';
import { createStopSchema, deleteStopSchema, editStopSchema } from '../schemas/stop.schema';
import express, { Request, Response } from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import stopModel from '../models/stop.model';
import { validate } from '../middleware/validate';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/new', restrictTo('admin'), validate(createStopSchema), addStopHandler);

router.post('/edit', restrictTo('admin'), validate(editStopSchema), editStopHandler);

router.post('/delete', restrictTo('admin'), validate(deleteStopSchema), deleteStopHandler);

router.get('/', restrictTo('admin'), getStopHandler);

export default router;
