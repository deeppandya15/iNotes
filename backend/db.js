const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/INotes_db";

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("db connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

const connectToMongo = () =>
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("MongoDB connection failed:", error));

module.exports = connectToMongo;
