import { connect, Mongoose } from "mongoose";

export const connectToDB = async (
  startServer: (connection: Mongoose) => void
) => {
  try {
    const connection = await connect(process.env.CONNECTION_URL);
    startServer(connection);
  } catch (error) {
    console.log(error);
  }
};
