const createError = require('http-errors');

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, 'Email and password are required'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError(400, 'Invalid email format'));
  }

  if (password.length < 6) {
    return next(createError(400, 'Password must be at least 6 characters'));
  }

  next();
};

exports.validateRegistration = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return next(createError(400, 'All fields are required'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError(400, 'Invalid email format'));
  }

  if (password.length < 6) {
    return next(createError(400, 'Password must be at least 6 characters'));
  }

  if (name.length < 2) {
    return next(createError(400, 'Name must be at least 2 characters'));
  }

  next();
};