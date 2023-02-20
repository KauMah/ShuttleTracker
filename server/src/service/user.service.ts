import { FilterQuery, QueryOptions } from 'mongoose';
import userModel, { User } from '../models/user.model';

import { DocumentType } from '@typegoose/typegoose';
import _ from 'lodash';
import { excludedFields } from '../controllers/auth.controller';
import { omit } from 'lodash';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

// Register User
export const registerUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// find all users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find a user by field
export const findUser = async (query: FilterQuery<User>, options: QueryOptions = {}) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign token
export const signToken = async (user: DocumentType<User>) => {
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: `${_.get(process.env, 'ACCESS_TOKEN_EXPIRES_IN', 5)}m`,
    }
  );

  // Create redis session
  redisClient.set(user._id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  return { access_token };
};
