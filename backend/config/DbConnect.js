const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connectionString = "mongodb://localhost:27017/artify";
  try {
    const connect = await mongoose.connect(connectionString, {});

    console.log("Artify mongo connected");
    return connect;
  } catch (error) {
    console.error("error happened: " + error.message);
    process.exit();
  }
};

module.exports = connectDatabase;
