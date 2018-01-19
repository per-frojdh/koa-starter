import logger from '../logger.mjs';

class ErrorHandler {
  static handleError(e) {
    console.log(e);
    if (e.isOperational) {
      logger.error.log('error', e);
    } else {
      logger.error.log('info', e.description || e);
    }
  }
}

export default ErrorHandler;
