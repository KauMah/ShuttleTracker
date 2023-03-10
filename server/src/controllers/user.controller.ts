import { NextFunction, Request, Response } from 'express';

import { findAllUsers } from '../service/user.service';

export const getMeHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getAllUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};
