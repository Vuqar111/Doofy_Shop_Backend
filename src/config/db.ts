import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbUrl = "mongodb+srv://vugarhasanov2003:8zmYQhmOi8zHQMn6@cluster0.a0mhgxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!dbUrl) {
      throw new Error(
        "Database URL is not defined in the environment variables"
      );
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDB;
