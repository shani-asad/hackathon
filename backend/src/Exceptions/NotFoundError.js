const NotFoundError = (res, message) => {
  res.status(404).json({
    status: false,
    message,
  });
};

module.exports = NotFoundError;
