import mongoose from "mongoose";

export const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected to MongoDB database");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exits the process with failure code (1) if the connection fails
  }
};
