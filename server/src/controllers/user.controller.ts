import { NextFunction, Request, Response } from 'express';
import { findAllAdmins, findAllDrivers, findAllRiders, findAllUsers } from '../service/user.service';

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

export const getAllRiderHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllRiders();
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

export const getAllDriverHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllDrivers();
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

export const getAllAdminHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllAdmins();
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
