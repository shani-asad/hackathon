const BadRequest = (res, message) =>{
  res.status(400).json({
    success: false,
    message,
  });
};

const NotFoundError = (res, message) => {
  res.status(404).json({
    success: false,
    message,
  });
};


const serverError = (res, message) => {
  res.status(500).json({
    success: false,
    message,
  })

};

module.exports = {NotFoundError, BadRequest, serverError};
