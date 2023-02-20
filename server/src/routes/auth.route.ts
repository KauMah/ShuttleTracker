import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';

import express from 'express';
import { validate } from '../middleware/validate';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerHandler);

router.post('/login', validate(loginUserSchema), loginHandler);

export default router;
