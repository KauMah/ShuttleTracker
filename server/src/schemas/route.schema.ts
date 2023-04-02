import { TypeOf, object, string } from 'zod';

const route = object({
  name: string({ required_error: 'Name is required' }),
  stops: string().length(24, 'ObjectIds must be 24 chars long Hex string').array().optional().default([]),
});

export const createRouteSchema = object({
  body: route,
});

export type CreateRouteInput = TypeOf<typeof createRouteSchema>['body'];
