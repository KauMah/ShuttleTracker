import { MongoError, MongoServerError, ObjectId } from 'mongodb';
import { NextFunction, Request, Response } from 'express';

import { CreateRouteInput } from '../schemas/route.schema';
import { Types } from 'mongoose';
import { createRoute } from '../service/route.service';

export const createRouteHandler = async (
  req: Request<object, object, CreateRouteInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, stops } = req.body;

  const newStops = stops.map((stop) => new Types.ObjectId(stop));
  try {
    const route = await createRoute({
      name,
      stops: newStops,
    });
    res.status(201).json({
      status: 'success',
      data: route,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong saving Route to collection',
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Internal Error occurred',
      err,
    });

    next(err);
  }
};
