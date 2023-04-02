import { createRouteHandler } from '../controllers/route.controller';
import { createRouteSchema } from '../schemas/route.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const routeRouter = express.Router();

routeRouter.use(deserializeUser);

routeRouter.post('/new', restrictTo('admin'), validate(createRouteSchema), createRouteHandler);

export default routeRouter;
