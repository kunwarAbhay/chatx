class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("2") ? "success" : "fail";
    this.isOperational = true;
  }
}

module.exports = AppError;
