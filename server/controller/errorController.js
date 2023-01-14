const AppError = require("../utils/appError.js");

const handleCastErrorDB = (error) => {
  return new AppError(`Invalid Id ${error?.path} : ${error?.value}`, 400);
};

const handleValidationError = (error) => {
  const message = `Validation error occured!`;
  return new AppError(message, 400);
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something really went wrong!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    // NOT WORKING CORRECTLY
    if (error.name === "CastError") error = handleCastErrorDB();
    if (error.name === "ValidationError") error = handleValidationError(error);

    sendProdError(error, res);
  }
};

module.exports = globalErrorHandler;
