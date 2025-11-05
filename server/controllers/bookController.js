const Book = require('../models/Book');
const Favorite = require('../models/Favorite');

exports.getBooks = async (req, res, next) => {
  try {
    const { q, author, title, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { author: { $regex: q, $options: 'i' } }
    ];
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (title) filter.title = { $regex: title, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Book.find(filter).skip(skip).limit(Number(limit)),
      Book.countDocuments(filter)
    ]);

    res.json({ data, page: Number(page), total });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    await Favorite.create({ userId: req.user.id, bookId: req.params.id });
    res.status(201).json({ message: 'added' });
  } catch (err) {
    if (err.code === 11000) return res.json({ message: 'already_favorited' });
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({ userId: req.user.id, bookId: req.params.id });
    res.json({ message: 'removed' });
  } catch (err) {
    next(err);
  }
};