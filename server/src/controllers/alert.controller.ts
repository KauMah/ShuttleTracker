import { ClearAlertInput, CreateAlertInput } from '../schemas/alert.schema';
import { MongoError, MongoServerError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import { clearAlert, createAlert, getAlerts } from '../service/alert.service';

export const createAlertHandler = async (
  req: Request<object, object, CreateAlertInput>,
  res: Response,
  next: NextFunction
) => {
  const { title, message, expiresAt } = req.body;
  const reqObj = {
    title,
    message,
    expiresAt: new Date(expiresAt),
  };
  try {
    const alert = await createAlert(reqObj);
    res.status(200).json({
      status: 'success',
      data: alert,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong creating Alert on Mongo',
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

export const clearAlertHandler = async (
  req: Request<object, object, ClearAlertInput>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const alert = await clearAlert(id);
    res.status(200).json({
      status: 'success',
      data: alert,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong changing Alert expiresAt',
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

export const getActiveAlertsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const alerts = await getAlerts();
    res.status(200).json({
      status: 'success',
      data: alerts,
    });
  } catch (err: unknown) {
    if (err instanceof MongoError || err instanceof MongoServerError) {
      res.status(400).json({
        status: 'fail',
        message: 'Something went wrong getting Alerts',
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
