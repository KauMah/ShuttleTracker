import { CreateRouteInput, EditRouteNameInput, EditRouteStopsInput, RouteIdInput } from '../schemas/route.schema';
import { MongoError, MongoServerError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import {
  addRouteStops,
  createRoute,
  deleteRoute,
  editRouteName,
  getAllRoutes,
  getRouteById,
  removeRouteStops,
} from '../service/route.service';

import { Types } from 'mongoose';

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

export const editRouteNameHandler = async (
  req: Request<object, object, EditRouteNameInput>,
  res: Response,
  next: NextFunction
) => {
  const { id, route } = req.body;
  try {
    const rt = await editRouteName(id, { name: route.name });
    res.status(200).json({
      status: 'success',
      date: rt,
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

export const addRouteStopHandler = async (
  req: Request<object, object, EditRouteStopsInput>,
  res: Response,
  next: NextFunction
) => {
  const { id, stopIds } = req.body;
  try {
    const idsToAdd = stopIds.map((id) => new Types.ObjectId(id));
    const rt = await addRouteStops(id, idsToAdd);
    res.status(200).json({
      status: 'success',
      data: rt,
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

export const removeRouteStopHandler = async (
  req: Request<object, object, EditRouteStopsInput>,
  res: Response,
  next: NextFunction
) => {
  const { id, stopIds } = req.body;
  try {
    const idsToPull = stopIds.map((id) => new Types.ObjectId(id));
    const rt = await removeRouteStops(id, idsToPull);
    res.status(200).json({
      status: 'success',
      data: rt,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong deleting Route from collection',
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

export const getRouteByIdHandler = async (
  req: Request<object, object, RouteIdInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const route = await getRouteById(id);
    res.status(200).json({
      status: 'success',
      data: route,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong getting Route',
      });
    }
    next(err);
  }
};

export const getRoutesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const route = await getAllRoutes();
    res.status(200).json({
      status: 'success',
      data: route,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong getting Route',
      });
    }
    next(err);
  }
};

export const deleteRouteHandler = async (
  req: Request<object, object, RouteIdInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const route = await deleteRoute(id);
    res.status(200).json({
      status: 'success',
      data: route,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong getting Route',
      });
    }
    next(err);
  }
};
