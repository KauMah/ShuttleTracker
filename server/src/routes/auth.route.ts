import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';

import express from 'express';
import { validate } from '../middleware/validate';

const authRouter = express.Router();

authRouter.post('/register', validate(registerUserSchema), registerHandler);

authRouter.post('/login', validate(loginUserSchema), loginHandler);

export default authRouter;
