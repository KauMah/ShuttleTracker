import shuttleModel, { Shuttle } from '../models/shuttle.model';

export const createShuttle = async (input: Partial<Shuttle>) => {
  return await shuttleModel.create(input);
};

export const editShuttle = async (id: string, shuttle: Partial<Shuttle>) => {
  return await shuttleModel.findByIdAndUpdate(id, { $set: shuttle }, { new: true });
};

export const getShuttle = async (id: string) => {
  return await shuttleModel.findById(id);
};

export const deleteShuttle = async (id: string) => {
  return await shuttleModel.findByIdAndDelete(id);
};

export const getAllShuttles = async () => {
  return await shuttleModel.find();
};
