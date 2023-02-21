import mongoose, { Error } from 'mongoose';

const connectDB = async (dbUrl: string) => {
  mongoose.set({ strictQuery: false });
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      setTimeout(connectDB, 5000);
    }
  }
};

export default connectDB;
