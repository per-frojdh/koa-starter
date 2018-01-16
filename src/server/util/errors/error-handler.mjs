import logger from '../logger.mjs';

class ErrorHandler {
  static handleError(e) {
    if (e.isOperational) {
      logger.log('error', e);
    } else {
      logger.log('info', e.description || e);
    }
  }
}

export default ErrorHandler;
