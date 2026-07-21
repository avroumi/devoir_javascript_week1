class AppError extends Error {
  constructor(message, statusCode) {
    (super(message || "Internal server Error"),
      (this.StatusCode = StatusCode || 500));
  }
}

export default AppError;
