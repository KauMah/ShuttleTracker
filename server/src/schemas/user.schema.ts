import { TypeOf, nativeEnum, object, optional, string } from 'zod';

import { Role } from '../models/user.model';

export const registerUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'email is required' })
      .email('Invalid email')
      .regex(new RegExp('^[a-zA-Z0-9._%+-]+@montclair.edu$'), 'Invalid email domain'),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be longer than 8 characters')
      .max(32, 'Password must be shorter than 32 characters'),
    passwordConfirm: string({ required_error: 'Must confirm password' }),
    role: optional(nativeEnum(Role)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(8, 'Invalid password'),
  }),
});

export const editUserSchema = object({
  body: object({
    user: object({
      id: string(),
      name: string(),
      email: string()
        .email('Invalid email')
        .regex(new RegExp('^[a-zA-Z0-9._%+-]+@montclair.edu$'), 'Invalid email domain'),
      password: string()
        .min(8, 'Password must be longer than 8 characters')
        .max(32, 'Password must be shorter than 32 characters'),
    }).partial(),
  }),
});

export const adminEditUserSchema = object({
  body: object({
    user: object({
      id: string(),
      name: string(),
      email: string()
        .email('Invalid email')
        .regex(new RegExp('^[a-zA-Z0-9._%+-]+@montclair.edu$'), 'Invalid email domain'),
      password: string()
        .min(8, 'Password must be longer than 8 characters')
        .max(32, 'Password must be shorter than 32 characters'),
      role: nativeEnum(Role),
    }).partial({ name: true, email: true, password: true, role: true }),
  }),
});

export const deleteUserSchema = object({
  body: object({
    id: string(),
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type EditUserInput = TypeOf<typeof editUserSchema>['body'];
export type AdminEditUserInput = TypeOf<typeof adminEditUserSchema>['body'];
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>['body'];
