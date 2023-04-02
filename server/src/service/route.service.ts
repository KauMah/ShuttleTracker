import routeModel, { Route } from '../models/route.model';

// Create Route
export const createRoute = async (input: Partial<Route>) => {
  return await routeModel.create(input);
};
