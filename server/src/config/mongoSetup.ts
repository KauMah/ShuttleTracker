import mongoose from 'mongoose';

const connect = (dbString: string) => {
  mongoose.set('strictQuery', false);
  mongoose.connect(dbString, { user: 'root', pass: 'root' }).then(() => {
    console.log('Connected to Mongo');
  });
};

export default connect;
