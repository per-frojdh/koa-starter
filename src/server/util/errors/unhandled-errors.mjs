import ErrorHandler from './error-handler.mjs';

process.on('unhandledRejection', (reason) => {
  // Unhandled promise failure, keep throwing it down to the error.
  throw reason;
});

process.on('uncaughtException', (error) => {
  // This should get activated on all throw calls.
  ErrorHandler.handleError(error);
});

class ApplicationError extends Error {
  constructor(name, httpCode, description, isOperational) {
    super();
    Error.captureStackTrace(this, this.constructor);
    // This is an opportunity to pass additional errors into the
    // errors object, that can allow us to give more specific errors to the end user.
    this.statusCode = httpCode;
    this.description = description;
    this.isOperational = isOperational;
  }
}

export default ApplicationError;
