import express, { Request, Response } from 'express';
import { getAllUserHandler, getMeHandler } from '../controllers/user.controller';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin'), getAllUserHandler);

router.get('/me', getMeHandler);

export default router;
