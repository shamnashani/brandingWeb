const mongo = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = async () => {
  try {
    await mongo.connect(process.env.MONGODB);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = db;