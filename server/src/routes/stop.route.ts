import { addStopHandler, deleteStopHandler, editStopHandler, getStopHandler } from '../controllers/stop.controller';
import { createStopSchema, deleteStopSchema, editStopSchema } from '../schemas/stop.schema';
import express from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const stopRouter = express.Router();

stopRouter.use(deserializeUser, requireUser);

stopRouter.post('/new', restrictTo('admin'), validate(createStopSchema), addStopHandler);

stopRouter.post('/edit', restrictTo('admin'), validate(editStopSchema), editStopHandler);

stopRouter.post('/delete', restrictTo('admin'), validate(deleteStopSchema), deleteStopHandler);

stopRouter.get('/', getStopHandler);

export default stopRouter;
