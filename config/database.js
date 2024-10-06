const mongoose = require("mongoose");

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
      dbName: "drimo_db",
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar en la base de datos");
  }
};

module.exports = {
  dbConexion,
};