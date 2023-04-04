import { TypeOf, boolean, number, object, string } from 'zod';

import { point } from './stop.schema';

const shuttle = object({
  capacity: number({ required_error: 'Must provide a value for capacity of shuttle' }).min(1).max(100),
  route: string().length(24, 'ObjectId for Route must be a 24 char long hex string'),
  driver: string().length(24, 'ObjectId for Driver must be a 24 char long hex string'),
  loc: point,
  active: boolean({ required_error: 'Must provide an active status for Shuttle' }),
});

export const createShuttleSchema = object({
  body: shuttle.partial({
    loc: true,
  }),
});

export const editShuttleParamsSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    shuttle: shuttle.partial(),
  }),
});

export const editShuttleLocationSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    shuttle: point.required(),
  }),
});

export const changeShuttleDriverSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    driverId: string({ required_error: 'Driver id is required for update' }),
  }),
});

export const changeShuttleRouteSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    routeId: string({ required_error: 'Route id is required for update' }),
  }),
});

export type CreateShuttleInput = TypeOf<typeof createShuttleSchema>['body'];
export type EditShuttleParamsInput = TypeOf<typeof editShuttleParamsSchema>['body'];
export type EditShuttleLocationInput = TypeOf<typeof editShuttleLocationSchema>['body'];
export type ChangeShuttleDriverInput = TypeOf<typeof changeShuttleDriverSchema>['body'];
export type ChangeShuttleRouteInput = TypeOf<typeof changeShuttleRouteSchema>['body'];
