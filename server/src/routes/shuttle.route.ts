import { createShuttleSchema, editShuttleParamsSchema, shuttleByIDSchema } from '../schemas/shuttle.schema';
import {
  createShuttleHandler,
  editShuttleHandler,
  getAllShuttlesHandler,
  getShuttleByIdHandler,
} from '../controllers/shuttle.controller';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const shuttleRouter = express.Router();

shuttleRouter.use(deserializeUser);

shuttleRouter.post('/new', restrictTo('admin'), validate(createShuttleSchema), createShuttleHandler);
shuttleRouter.post('/edit', restrictTo('admin'), validate(editShuttleParamsSchema), editShuttleHandler);
shuttleRouter.post('/', validate(shuttleByIDSchema), getShuttleByIdHandler);
shuttleRouter.post('/delete', restrictTo('admin'), validate(shuttleByIDSchema), getShuttleByIdHandler);
shuttleRouter.get('/', getAllShuttlesHandler);

export default shuttleRouter;
