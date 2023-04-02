import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    next();
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: 'fail',
        error: err.errors,
      });
    }
    next(err);
  }
};
