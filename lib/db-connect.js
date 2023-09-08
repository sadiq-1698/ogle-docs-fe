import mongoose from "mongoose";

var MONGOOSE;
const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let CACHED = MONGOOSE;

if (!CACHED) {
  CACHED = MONGOOSE = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (CACHED.conn) {
    return CACHED.conn;
  }
  if (!CACHED.promise) {
    const opts = {
      bufferCommands: false,
    };
    CACHED.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to DB!");
      return mongoose;
    });
  }
  try {
    CACHED.conn = await CACHED.promise;
  } catch (e) {
    CACHED.promise = null;
    throw e;
  }

  return CACHED.conn;
}

export default connectToDatabase;
