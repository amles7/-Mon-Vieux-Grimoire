const express = require("express");
const router = express.Router();
const bookscontrollers = require("../controllers/books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/", auth, multer, bookscontrollers.createBook);
router.get("/", bookscontrollers.getAllBooks);
router.get("/:id", bookscontrollers.getBookById);
router.put("/:id", auth, multer, bookscontrollers.updateBook);
router.delete("/:id", bookscontrollers.deleteBook);

module.exports = router;
