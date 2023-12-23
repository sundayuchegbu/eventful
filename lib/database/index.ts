import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_URI) throw new Error('MONGODB URI is missing');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: 'eventful',
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
