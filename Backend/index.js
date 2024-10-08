const dotenv = require("dotenv");
dotenv.config(); // Charger les variables d'environnement
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./mongo");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/books");
const path = require("path");

const app = express();

connectToMongo();

// Middleware pour traiter les requêtes JSON
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
