import { clearAlertHandler, createAlertHandler, getActiveAlertsHandler } from '../controllers/alert.controller';
import { clearAlertSchema, createAlertSchema } from '../schemas/alert.schema';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const alertRouter = express.Router();

alertRouter.use(deserializeUser);

alertRouter.post('/new', validate(createAlertSchema), restrictTo('admin'), createAlertHandler);
alertRouter.post('/clear', validate(clearAlertSchema), restrictTo('admin'), clearAlertHandler);
alertRouter.get('/', getActiveAlertsHandler);

export default alertRouter;
