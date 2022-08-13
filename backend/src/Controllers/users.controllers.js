const User = require('../Models/User');
const { NotFoundError } = require('../Exceptions/Exceptions');

const login = (req, res) => {
  User.find({ type: req.body.type })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        res.status(201).json({
          data,
          message: 'Logged in',
        });
      }
      NotFoundError(res, 'Type not found');
    });
};

const logout = (req, res) => {

};

module.exports = {
  login,
  logout,
};
