module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  const details = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  res.status(status).json({ message, details });
};