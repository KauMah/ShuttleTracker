import { TypeOf, object, string } from 'zod';

const alert = object({
  title: string({ required_error: 'Must provide a title' }),
  message: string({ required_error: 'Must provide a message' }),
  expiresAt: string({ required_error: 'Must provide a expiry date' }).refine(
    (val) => new Date(val).getTime() > Date.now()
  ),
});

export const createAlertSchema = object({
  body: alert,
});

export const clearAlertSchema = object({
  body: object({
    id: string({ required_error: 'id is required to clear alert' }),
  }),
});

export type CreateAlertInput = TypeOf<typeof createAlertSchema>['body'];
export type ClearAlertInput = TypeOf<typeof clearAlertSchema>['body'];
