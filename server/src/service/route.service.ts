import { Types } from 'mongoose';
import routeModel, { Route } from '../models/route.model';

// Create Route
export const createRoute = async (input: Partial<Route>) => {
  return await routeModel.create(input);
};

// Edit Route
export const editRouteName = async (id: string, route: Partial<Route>) => {
  return await routeModel.findByIdAndUpdate(id, { $set: route }, { new: true });
};

// add Route Stops
export const addRouteStops = async (id: string, stops: Types.ObjectId[]) => {
  return await routeModel.findByIdAndUpdate(
    id,
    { $addToSet: { stops: { $each: stops } } },
    { new: true, upsert: true }
  );
};

// remove Route Stops
export const removeRouteStops = async (id: string, stops: Types.ObjectId[]) => {
  return await routeModel.findByIdAndUpdate(id, { $pull: { stops: { $in: stops } } }, { new: true });
};

// get Route by Id
export const getRouteById = async (id: string) => {
  return await routeModel.findById(id).populate('stops');
};

// get all Routes
export const getAllRoutes = async () => {
  return await routeModel.find().populate('stops');
};

// delete Route by Id
export const deleteRoute = async (id: string) => {
  return await routeModel.findByIdAndDelete(id);
};
