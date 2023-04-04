import { CreateShuttleInput, EditShuttleParamsInput, ShuttleIdInput } from '../schemas/shuttle.schema';
import { MongoError, MongoServerError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import { createShuttle, deleteShuttle, editShuttle, getAllShuttles, getShuttle } from '../service/shuttle.service';

import { Types } from 'mongoose';
import _ from 'lodash';

export const createShuttleHandler = async (
  req: Request<object, object, CreateShuttleInput>,
  res: Response,
  next: NextFunction
) => {
  const { capacity, route, driver, loc, active } = req.body;
  const routeId = new Types.ObjectId(route);
  const driverId = new Types.ObjectId(driver);
  const reqObj = {
    capacity,
    loc,
    active,
    route: routeId,
    driver: driverId,
  };
  _.omitBy(reqObj, (field) => field === null);
  if (!driver || !route) {
    reqObj.active = false;
  }
  try {
    const shuttle = await createShuttle(reqObj);
    res.status(200).json({ status: 'success', data: shuttle });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong adding Shuttle to collection',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Unknown Internal Error occurred',
      err,
    });
    next(err);
  }
};

export const editShuttleHandler = async (
  req: Request<object, object, EditShuttleParamsInput>,
  res: Response,
  next: NextFunction
) => {
  const { capacity, route, driver, loc, active } = req.body.shuttle;
  const routeId = new Types.ObjectId(route);
  const driverId = new Types.ObjectId(driver);
  const reqObj = {
    capacity,
    loc,
    active,
    route: routeId,
    driver: driverId,
  };
  _.omitBy(reqObj, (field) => field === null);
  try {
    const shuttle = await editShuttle(req.body.id, reqObj);
    res.status(200).json({
      status: 'success',
      data: shuttle,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong editing Shuttle',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Unknown Internal Error occurred',
      err,
    });
    next(err);
  }
};
export const getShuttleByIdHandler = async (
  req: Request<object, object, ShuttleIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const shuttle = await getShuttle(req.body.id);
    res.status(200).json({
      status: 'success',
      data: shuttle,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong getting Shuttle by Id',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Unknown Internal Error occurred',
      err,
    });
    next(err);
  }
};

export const deleteShuttleByIdHandler = async (
  req: Request<object, object, ShuttleIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const shuttle = await deleteShuttle(req.body.id);
    res.status(200).json({
      status: 'success',
      data: shuttle,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong deleting Shuttle by Id',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Unknown Internal Error occurred',
      err,
    });
    next(err);
  }
};

export const getAllShuttlesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shuttles = await getAllShuttles();
    res.status(200).json({
      status: 'success',
      data: shuttles,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong deleting Shuttle by Id',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Unknown Internal Error occurred',
      err,
    });
    next(err);
  }
};
