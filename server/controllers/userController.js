const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Will be hashed in pre-save

    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const Favorite = require('../models/Favorite');
exports.getFavorites = async (req, res, next) => {
  try {
    const favs = await Favorite.find({ userId: req.user.id }).populate('bookId');
    const data = favs.map((f) => ({
      _id: f._id,
      userId: f.userId,
      bookId: f.bookId?._id || f.bookId,
      createdAt: f.createdAt,
      book: f.bookId && {
        _id: f.bookId._id,
        title: f.bookId.title,
        author: f.bookId.author,
        coverImage: f.bookId.coverImage
      }
    }));
    res.json(data);
  } catch (err) {
    next(err);
  }
};