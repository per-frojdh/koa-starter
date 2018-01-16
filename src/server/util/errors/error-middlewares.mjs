import ApplicationError from './unhandled-errors.mjs';
import ErrorHandler from './error-handler.mjs';
import { commonErrors, httpErrors } from './error-types.mjs';

/**
 * The errorHandler is responsible for throwing the appropriate error page to the end user
 * and is able to use the data extracted from our ApplicationError.
 * @param ctx - the koa context
 * @param next - the koa next-function
 */
const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // This allows us to distinguish operational errors from simple application errors like PageNotFound
    // or particular errors like 'Entity Not Found' etc.
    ErrorHandler.handleError(err);
    err.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.description,
    };
  }
};

/**
 * The httpCodeHandler is responsible for catching the status errors from Koa
 * and from our routes, and throw the appropriate error in order to display
 * either an error page or a page not found message
 * @param ctx - the koa context
 * @param next - the koa next-function
 */
const httpCodeHandler = async (ctx, next) => {
  await next();
  switch (ctx.status) {
    case 404:
      throw new ApplicationError(
        commonErrors.PageNotFound,
        httpErrors.PageNotFound,
        'Page not found',
        false,
      );
    default:
      throw new ApplicationError(
        commonErrors.SystemError,
        httpErrors.InternalServerError,
        'Page not found',
        true,
      );
  }
};

export default { errorHandler, httpCodeHandler };
