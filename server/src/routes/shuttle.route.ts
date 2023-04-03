import { deserializeUser } from '../middleware/deserializeUser';
import express from 'express';

const shuttleRouter = express.Router();

shuttleRouter.use(deserializeUser);

export default shuttleRouter;
