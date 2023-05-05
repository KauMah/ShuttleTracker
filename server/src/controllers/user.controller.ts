import { AdminEditUserInput, DeleteUserInput, EditUserInput } from '../schemas/user.schema';
import { NextFunction, Request, Response } from 'express';
import {
  adminEditUser,
  deleteUser,
  editUser,
  findAllAdmins,
  findAllDrivers,
  findAllRiders,
  findAllUsers,
} from '../service/user.service';

import { User } from '../models/user.model';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

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

export const editUserHandler = async (
  req: Request<object, object, EditUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;
  const usr = res.locals.user as User;
  try {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    const u = await editUser(usr.email, user);
    res.status(200).json({
      status: 'success',
      data: {
        u,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const adminEditUserHandler = async (
  req: Request<object, object, AdminEditUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body;
  try {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    if (!user.id) {
      throw 'no ID supplied';
    }
    const u = await adminEditUser(user.id, _.omit(user, ['id']));
    res.status(200).json({
      status: 'success',
      data: {
        u,
      },
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const deleteUserHandler = async (
  req: Request<object, object, DeleteUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    await deleteUser(id);
    res.status(200).json({
      status: 'success',
    });
  } catch (err: unknown) {
    next(err);
  }
};
