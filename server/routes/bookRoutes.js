const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/:id/favorite', auth, bookController.addFavorite);
router.delete('/:id/favorite', auth, bookController.removeFavorite);

module.exports = router;