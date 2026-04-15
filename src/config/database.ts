import { connect } from "mongoose";
import config from "./environment";

const mongoURI = config.MONGODB_URL || "mongodb://127.0.0.1:27017/zim_register";

const connectDatabase = async () => {
  try {
    await connect(mongoURI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err: any) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
};

export default connectDatabase;