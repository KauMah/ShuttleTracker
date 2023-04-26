import alertModel, { Alert } from '../models/alert.model';

export const createAlert = async (input: Alert) => {
  return await alertModel.create(input);
};

export const clearAlert = async (id: string) => {
  return await alertModel.findByIdAndUpdate(id, { $set: { expiresAt: Date.now() } });
};

export const getAlerts = async () => {
  return await alertModel.find({ expiresAt: { $gt: new Date() } });
};
