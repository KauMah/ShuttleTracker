import { createRouteSchema, editRouteNameSchema, editRouteStopsSchema, routeIdSchema } from '../schemas/route.schema';
import {
  addRouteStopHandler,
  createRouteHandler,
  deleteRouteHandler,
  editRouteNameHandler,
  getRouteByIdHandler,
  getRoutesHandler,
  removeRouteStopHandler,
} from '../controllers/route.controller';

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
routeRouter.post('/', validate(routeIdSchema), getRouteByIdHandler);
routeRouter.get('/', getRoutesHandler);
routeRouter.post('/delete', restrictTo('admin'), validate(routeIdSchema), deleteRouteHandler);

export default routeRouter;
