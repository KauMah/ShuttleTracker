import { CreateStopInput, EditStopInput } from '../schemas/stop.schema';
import { GeoJSONPoint, Stop } from '../models/stop.model';
import { NextFunction, Request, Response } from 'express';
import { createStop, updateStop } from '../service/stop.service';

import { DocumentType } from '@typegoose/typegoose';
import { MongoError } from 'mongodb';

export const addStopHandler = async (
  req: Request<object, object, CreateStopInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, loc } = req.body;
  try {
    const stop = await createStop({
      name,
      loc: {
        ...loc,
        coordinates: [loc.coordinates[0], loc.coordinates[1]],
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        stop,
      },
    });
  } catch (err: unknown) {
    if (err instanceof MongoError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong saving Stop to collection',
      });
    }
    next(err);
  }
};

export const editStopHandler = async (
  req: Request<object, object, EditStopInput>,
  res: Response,
  next: NextFunction
) => {
  const { stop } = req.body;
  try {
    const { _id } = stop as Partial<DocumentType<Stop>>;
    // let tempStop;
    // if (!stop.loc) {
    //   tempStop = { ...stop } as Partial<DocumentType<Stop>>;
    // } else {
    //   tempStop = { ...stop, loc: stop.loc as GeoJSONPoint };
    // }
    const newStop = await updateStop(_id, stop as Partial<DocumentType<Stop>>);

    res.status(201).json({
      status: 'success',
      data: {
        stop,
      },
    });
  } catch (err: unknown) {
    if (err instanceof MongoError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong saving Stop to collection',
      });
      next(err);
    }
  }
};
