import shuttleModel, { Shuttle } from '../models/shuttle.model';

export const createShuttle = async (input: Partial<Shuttle>) => {
  return await shuttleModel.create(input);
};
