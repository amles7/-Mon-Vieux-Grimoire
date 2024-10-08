const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Inscription
exports.signup = async (req, res) => {
  try {
    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Email non conforme" });
    }

    // Hachage du mot de passe
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hash });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
// Connexion

exports.login = async (req, res) => {
  try {
    console.log("Tentative de connexion avec l'email :", req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé !" });
    }

    console.log("Utilisateur trouvé :", user);
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect !" });
    }

    console.log("Mot de passe valide");
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    console.log("Token généré avec succès");
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error });
  }
};
