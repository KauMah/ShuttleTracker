import { TypeOf, array, number, object, string, z } from 'zod';

const stop = object({
  name: string({ required_error: 'Name is required' }),
  loc: object({
    type: z.enum(['Point']),
    coordinates: number()
      .array()
      .length(2, 'Location is malformed')
      .refine((input: number[]) => Math.abs(input[0]) > 180, { path: ['loc'], message: 'Invalid value for longitude' })
      .refine((input: number[]) => Math.abs(input[1]) > 90, { path: ['loc'], message: 'Invalid value for latitude' }),
  }).required(),
});

export const createStopSchema = object({
  body: stop,
});

export const editStopSchema = object({
  body: object({
    stop: stop.partial(),
  }),
});

export type CreateStopInput = TypeOf<typeof createStopSchema>['body'];
export type EditStopInput = TypeOf<typeof editStopSchema>['body'];
