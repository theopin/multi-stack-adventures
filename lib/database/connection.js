const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connection = async () => {
  
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB database successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
    throw new Error("Failed to connect to MongoDB database!");
  });

  return mongoose;
};

module.exports = { connection, mongoose };