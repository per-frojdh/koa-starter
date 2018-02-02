import logger from '../logger.mjs';
import ApplicationError from './unhandled-errors.mjs';
import { commonErrors, httpErrors } from './error-types.mjs';

class ErrorHandler {
  static handleError(e, ctx) {
    if (e.isOperational) {
      // Do nothing
    } else {
      console.log(ctx.transaction);
      logger.error.log('error', e.message, {
        isOperational: e.isOperational,
        stack: e.stack,
        message: e.message,
        path: ctx.originalUrl,
        transaction: ctx.transaction,
      });
    }
  }

  static createBadRequestError(ctx) {
    // Figure out what could be wrong through the context
    throw new ApplicationError(
      commonErrors.BadRequest,
      httpErrors.BadRequest,
      'Bad Request',
      false,
    );
  }
}

export default ErrorHandler;
