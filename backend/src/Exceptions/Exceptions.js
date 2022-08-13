const BadRequest = (res, message) =>{
  res.status(400).json({
    status: false,
    message,
  });
};

const NotFoundError = (res, message) => {
  res.status(404).json({
    status: false,
    message,
  });
};


const serverError = (res, message) => {
  res.status(500).json({
    status: false,
    message,
  })

};


module.exports = {NotFoundError, BadRequest, serverError,};
