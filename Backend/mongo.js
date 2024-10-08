const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");



const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => console.error("Erreur de connexion à MongoDB :", error));
};

module.exports = connectToMongo;
