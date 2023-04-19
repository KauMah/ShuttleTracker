import { TypeOf, boolean, number, object, string } from 'zod';

import { point } from './stop.schema';

const shuttle = object({
  capacity: number({ required_error: 'Must provide a value for capacity of shuttle' }).min(1).max(100),
  occupancy: number().min(0).max(100),
  route: string().length(24, 'ObjectId for Route must be a 24 char long hex string'),
  driver: string().length(24, 'ObjectId for Driver must be a 24 char long hex string'),
  loc: point,
  active: boolean({ required_error: 'Must provide an active status for Shuttle' }),
});

export const createShuttleSchema = object({
  body: shuttle.partial({
    loc: true,
    driver: true,
    route: true,
  }),
});

export const editShuttleParamsSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    shuttle: shuttle.partial(),
  }),
});

export const shuttleByIDSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
  }),
});

export type CreateShuttleInput = TypeOf<typeof createShuttleSchema>['body'];
export type EditShuttleParamsInput = TypeOf<typeof editShuttleParamsSchema>['body'];
export type ShuttleIdInput = TypeOf<typeof shuttleByIDSchema>['body'];
