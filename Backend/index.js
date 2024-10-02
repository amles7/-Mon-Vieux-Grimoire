const express = require("express");
const app = express();
const run = require("./mongo"); // Assure-toi que c'est bien en minuscule, car tu exportes 'run'

run(); // Appel de la fonction run pour connecter MongoDB

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Le serveur écoute sur le port 3000");
});

