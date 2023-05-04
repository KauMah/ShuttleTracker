import {
  createShuttleHandler,
  deleteShuttleByIdHandler,
  editShuttleHandler,
  getAllShuttlesHandler,
  getShuttleByIdHandler,
  getShuttlePositionByIdHandler,
} from '../controllers/shuttle.controller';
import { createShuttleSchema, editShuttleParamsSchema, shuttleByIDSchema } from '../schemas/shuttle.schema';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const shuttleRouter = express.Router();

shuttleRouter.use(deserializeUser);

shuttleRouter.post('/new', restrictTo('admin'), validate(createShuttleSchema), createShuttleHandler);
shuttleRouter.post('/edit', restrictTo('admin'), validate(editShuttleParamsSchema), editShuttleHandler);
shuttleRouter.post('/', validate(shuttleByIDSchema), getShuttleByIdHandler);
shuttleRouter.post('/delete', restrictTo('admin'), validate(shuttleByIDSchema), deleteShuttleByIdHandler);
shuttleRouter.get('/', getAllShuttlesHandler);
shuttleRouter.post('/position', validate(shuttleByIDSchema), getShuttlePositionByIdHandler);

export default shuttleRouter;
