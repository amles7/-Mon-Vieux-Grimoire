const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) return next();

  const outputPath = path.join("images", `optimized-${req.file.filename}`);

  sharp(req.file.path)
    .resize(800) 
    .jpeg({ quality: 80 }) 
    .toFile(outputPath, (err) => {
      if (err) return res.status(500).json({ error: "Erreur lors de l'optimisation de l'image" });

     
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error("Erreur lors de la suppression du fichier original :", unlinkErr);
      });

      req.file.path = outputPath;
      req.file.filename = `optimized-${req.file.filename}`;
      next();
    });
};
