import {
  addRouteStopHandler,
  createRouteHandler,
  editRouteNameHandler,
  removeRouteStopHandler,
} from '../controllers/route.controller';
import { createRouteSchema, editRouteNameSchema, editRouteStopsSchema } from '../schemas/route.schema';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const routeRouter = express.Router();

routeRouter.use(deserializeUser);

routeRouter.post('/new', restrictTo('admin'), validate(createRouteSchema), createRouteHandler);

routeRouter.post('/edit', restrictTo('admin'), validate(editRouteNameSchema), editRouteNameHandler);
routeRouter.post('/addStops', restrictTo('admin'), validate(editRouteStopsSchema), addRouteStopHandler);
routeRouter.post('/removeStops', restrictTo('admin'), validate(editRouteStopsSchema), removeRouteStopHandler);

export default routeRouter;
