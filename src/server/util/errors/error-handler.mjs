import logger from '../logger.mjs';

class ErrorHandler {
  static handleError(e) {
    if (e.isOperational) {
      // Do nothing
    } else {
      logger.error.log('info', e.description || e);
    }
  }
}

export default ErrorHandler;
