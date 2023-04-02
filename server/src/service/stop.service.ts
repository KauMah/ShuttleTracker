import { FilterQuery, QueryOptions } from 'mongoose';

import { DocumentType } from '@typegoose/typegoose';
import { Stop } from '../models/stop.model';
import { User } from '../models/user.model';
import _ from 'lodash';
import stopModel from '../models/stop.model';

// Create Stop
export const createStop = async (input: Partial<Stop>) => {
  return await stopModel.create(input);
};

// Find stop by ID
export const findStopByID = async (id: string) => {
  return await stopModel.findById(id).lean();
};

// Find stop by name
export const findStopByField = async (query: FilterQuery<User>, options: QueryOptions) => {
  return await stopModel.findOne(query, {}, options);
};

// Update stop by ID
export const updateStop = async (id: string, stop: Partial<DocumentType<Stop>>) => {
  return await stopModel.findByIdAndUpdate(id, { $set: _.omit({ ...stop }, ['_id']) });
};

// Delete stop by ID
export const deleteStop = async (id: string) => {
  return await stopModel.findByIdAndDelete(id);
};

// Get all stops
export const getStops = async () => {
  return await stopModel.find();
};
