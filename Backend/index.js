const dotenv = require("dotenv");
dotenv.config(); // Charger les variables d'environnement
const express = require("express");
const cors = require("cors"); 
const connectToMongo = require("./mongo"); // Connexion MongoDB
const userRoutes = require("./routes/user"); // Routes d'authentification

const app = express();

// Connexion à MongoDB
connectToMongo();

// Middleware pour traiter les requêtes JSON
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", userRoutes); // Routes pour l'authentification


// Port de l'application
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
