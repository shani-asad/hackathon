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


<<<<<<< HEAD:backend/src/Exceptions/NotFoundError.js
module.exports = NotFoundError;
module.exports = BadRequest;
=======
module.exports = {NotFoundError, BadRequest, serverError,};
>>>>>>> ca800c83587e97d3129779a91e2b61d4c0e0c18a:backend/src/Exceptions/Exceptions.js
