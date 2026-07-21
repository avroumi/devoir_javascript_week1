export const ErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error ",
    statusCode: error.statusCode || 500,
  });
};
