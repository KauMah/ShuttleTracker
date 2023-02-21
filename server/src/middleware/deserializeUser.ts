import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/appError';
import _ from 'lodash';
import { findUserById } from '../service/user.service';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
      access_token = _.get(req.cookies, 'accessToken', '');
    }

    if (!access_token) {
      return next(new AppError('You are not logged in', 401));
    }

    const decoded = verifyJwt<{ sub: string }>(access_token);

    if (!decoded) {
      return next(new AppError('Invalid token, does the user exist?', 401));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError('User session expired', 401));
    }

    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    res.locals.user = user;
    next();
  } catch (err: unknown) {
    next(err);
  }
};
