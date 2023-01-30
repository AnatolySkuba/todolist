/* eslint-disable no-console */
import { ConnectionOptions, connect } from 'mongoose';

const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    await connect(
      'mongodb+srv://Anatoly:15122007lT15122007@cluster0.r65nkew.mongodb.net/cgs-team-camp?retryWrites=true&w=majority',
      options
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error((err as Error).message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
