import { TypeOf, literal, number, object, string, tuple } from 'zod';

const coordinate = tuple([number().min(-180).max(180), number().min(-90).max(90)]);

export const point = object({
  type: literal('Point'),
  coordinates: coordinate,
});

const stop = object({
  name: string({ required_error: 'Name is required' }),
  loc: point,
});

export const createStopSchema = object({
  body: stop,
});

export const editStopSchema = object({
  body: object({
    stop: stop.partial(),
  }),
});

export const deleteStopSchema = object({
  body: object({
    id: string({ required_error: 'Must supply an id to delete Stop' }),
  }),
});

export type CreateStopInput = TypeOf<typeof createStopSchema>['body'];
export type EditStopInput = TypeOf<typeof editStopSchema>['body'];
export type DeleteStopInput = TypeOf<typeof deleteStopSchema>['body'];
