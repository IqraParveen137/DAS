import mongoose from 'mongoose';
import 'colors';
const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Database connected'.bgMagenta.white);
  });
  await mongoose.connect(`${process.env.MONGO_LOCAL_URI}/doctorapp`);
};
export default connectDB;
