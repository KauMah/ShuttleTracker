import { MongoError, MongoServerError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';

import { CreateShuttleInput } from '../schemas/shuttle.schema';
import { Types } from 'mongoose';
import { createShuttle } from '../service/shuttle.service';

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
  // _.omitBy(reqObj, (field) => field === null);
  try {
    const shuttle = await createShuttle(reqObj);
    res.status(200).json({ status: 'success', data: shuttle });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong saving Route to collection',
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
