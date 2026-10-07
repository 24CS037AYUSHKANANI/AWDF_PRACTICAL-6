const mongoose = require("mongoose");

async function connectMongo() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not set.");
  }

  await mongoose.connect(uri);
  console.log("MongoDB ready for 24CS037");
}

module.exports = connectMongo;
