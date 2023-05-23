// routes/users.js

const CustomError = require('../config/error/CustomError');

function getUser(req, res, next) {
  try {
    const user = getUserFromDatabase();

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = getUser;
