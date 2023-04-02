import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Error, MongooseError } from 'mongoose';
import { findUser, registerUser, signToken } from '../service/user.service';

import AppError from '../utils/appError';
import { MongoError } from 'mongodb';
import { RegisterUserInput } from '../schemas/user.schema';
import _ from 'lodash';
import { errors } from '@typegoose/typegoose';

export const excludedFields = ['password'];
const expTime: number = parseInt(_.get(process.env, 'ACCESS_TOKEN_EXPIRES_IN', '12'));

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + expTime * 60 * 60 * 1000),
  maxAge: expTime * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// production settings
if (_.get(process.env, 'NODE_ENV', 'development') === 'production') accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<object, object, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: unknown) {
    if (err instanceof MongoError) {
      if (err.code === 11000) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists',
        });
      }
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<object, object, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user || !(await user.comparePasswords(user.password, req.body.password))) {
      return next(new AppError('Invalid email or Password', 401));
    }

    const { access_token } = await signToken(user);

    res.cookie('accessToken', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      user: {
        access_token,
        ..._.pick(user, ['id', 'name', 'email', 'role']),
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};
