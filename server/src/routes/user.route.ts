import {
  adminEditUserHandler,
  deleteUserHandler,
  editUserHandler,
  getAllAdminHandler,
  getAllDriverHandler,
  getAllRiderHandler,
  getAllUserHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { adminEditUserSchema, deleteUserSchema, editUserSchema } from '../schemas/user.schema';

import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';

const userRouter = express.Router();

userRouter.use(deserializeUser, requireUser);

userRouter.get('/', restrictTo('admin'), getAllUserHandler);
userRouter.get('/riders', restrictTo('admin'), getAllRiderHandler);
userRouter.get('/drivers', restrictTo('admin'), getAllDriverHandler);
userRouter.get('/admins', restrictTo('admin'), getAllAdminHandler);
userRouter.post('/edit', validate(editUserSchema), editUserHandler);
userRouter.post('/adminEdit', restrictTo('admin'), validate(adminEditUserSchema), adminEditUserHandler);
userRouter.post('/delete', restrictTo('admin'), validate(deleteUserSchema), deleteUserHandler);
userRouter.get('/me', getMeHandler);

export default userRouter;
