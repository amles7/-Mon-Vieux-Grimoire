const Books = require("../models/Books");
const fs = require("fs");

exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  const book = new Books({
    ...bookObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre créé avec succès !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res) => {
  Books.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getBookById = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateBook = (req, res) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Books.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Livre modifié avec succès !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((book) => {
      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Books.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Livre supprimé avec succès !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.addRating = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { userId, rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'La note doit être entre 0 et 5.' });
    }

    // Récupérer le livre
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    // Vérifier si l'utilisateur a déjà noté
    const existingRating = book.ratings.find(r => r.userId === userId);
    if (existingRating) {
      return res.status(400).json({ message: 'Vous avez déjà noté ce livre.' });
    }

    book.ratings.push({ userId, grade: rating });

    // Calculer la nouvelle moyenne
    const totalRatings = book.ratings.length;
    const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
    book.averageRating = sumRatings / totalRatings;

    // Sauvegarder le livre avec la nouvelle note et moyenne
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.getBestRatedBooks = async (req, res) => {
  try {
    const bestRatedBooks = await Books.find()
      .sort({ averageRating: -1 }) // Trier par note moyenne décroissante
      .limit(3); // Limiter aux trois meilleurs
    res.status(200).json(bestRatedBooks);
  } catch (error) {
    res.status(500).json({ error });
  }
};