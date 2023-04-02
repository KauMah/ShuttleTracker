import { TypeOf, object, string } from 'zod';

const route = object({
  name: string({ required_error: 'Name is required' }),
  stops: string().length(24, 'ObjectIds must be 24 chars long Hex string').array().optional().default([]),
});

export const createRouteSchema = object({
  body: route,
});

export const editRouteNameSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    route: route.partial(),
  }),
});

export const editRouteStopsSchema = object({
  body: object({
    id: string({ required_error: 'id is required for update' }),
    stopIds: string().array().min(1),
  }),
});

export type CreateRouteInput = TypeOf<typeof createRouteSchema>['body'];
export type EditRouteNameInput = TypeOf<typeof editRouteNameSchema>['body'];
export type EditRouteStopsInput = TypeOf<typeof editRouteStopsSchema>['body'];
