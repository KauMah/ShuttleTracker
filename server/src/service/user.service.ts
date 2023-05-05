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

// find all users
export const findAllRiders = async () => {
  return await userModel.find({ role: 'rider' });
};

// find all users
export const findAllDrivers = async () => {
  return await userModel.find({ role: 'driver' });
};

// find all users
export const findAllAdmins = async () => {
  return await userModel.find({ role: 'admin' });
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
      expiresIn: `${_.get(process.env, 'ACCESS_TOKEN_EXPIRES_IN', 12)}h`,
    }
  );

  // Create redis session
  const hrsToExpire: number = parseInt(_.get(process.env, 'ACCESS_TOKEN_EXPIRES_IN', '12'));
  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60 * hrsToExpire,
  });

  return { access_token };
};

export const editUser = async (email: string, user: Partial<DocumentType<User>>) => {
  return await userModel.findOneAndUpdate({ email }, { $set: { ...user } }, { new: true });
};

export const adminEditUser = async (id: string, user: Partial<DocumentType<User>>) => {
  return await userModel.findByIdAndUpdate(id, { $set: { ...user } }, { new: true });
};

// Delete User
export const deleteUser = async (id: string) => {
  return await userModel.findByIdAndRemove(id);
};
