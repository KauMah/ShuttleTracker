import { createShuttleHandler } from '../controllers/shuttle.controller';
import { createShuttleSchema } from '../schemas/shuttle.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const shuttleRouter = express.Router();

shuttleRouter.use(deserializeUser);

shuttleRouter.post('/new', restrictTo('admin'), validate(createShuttleSchema), createShuttleHandler);

export default shuttleRouter;
