import nanoid from 'nanoid';
import logger from './util/logger.mjs';

const getAccessLevelByCode = (code) => {
  if (code >= 200 && code <= 299) {
    return '2xx';
  } else if (code >= 300 && code <= 399) {
    return '3xx';
  } else if (code >= 400 && code <= 499) {
    return '4xx';
  } else if (code >= 500 && code <= 599) {
    return '5xx';
  }
  return 'info';
};

const transactionIdHandler = async (ctx, next) => {
  ctx.transaction = nanoid();
  await next();
};

const accessLoggerHandler = async (ctx, next) => {
  await next();
  logger.access.log(getAccessLevelByCode(ctx.status), {
    status: ctx.status,
    path: ctx.path,
  });
};

const responseTimeHandler = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};

export default {
  transactionIdHandler,
  accessLoggerHandler,
  responseTimeHandler,
};
