const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB Atlas:", error.message);
    process.exit(1); // encerra se não conectar
  }
};

module.exports = connectDB;
