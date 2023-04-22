import {
  getAllAdminHandler,
  getAllDriverHandler,
  getAllRiderHandler,
  getAllUserHandler,
  getMeHandler,
} from '../controllers/user.controller';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const userRouter = express.Router();

userRouter.use(deserializeUser, requireUser);

userRouter.get('/', restrictTo('admin'), getAllUserHandler);
userRouter.get('/riders', restrictTo('admin'), getAllRiderHandler);
userRouter.get('/drivers', restrictTo('admin'), getAllDriverHandler);
userRouter.get('/admins', restrictTo('admin'), getAllAdminHandler);

userRouter.get('/me', getMeHandler);

export default userRouter;
