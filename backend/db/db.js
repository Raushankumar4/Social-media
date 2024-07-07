import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Social",
    });
    console.log("Connected to Db");
  } catch (error) {
    console.log(error);
  }
};

export { dbConnection };
