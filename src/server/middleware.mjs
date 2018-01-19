import nanoid from 'nanoid';
import logger from './util/logger.mjs';

const transactionIdHandler = async (ctx, next) => {
  ctx.transaction = nanoid();
  await next();
};

const accessLoggerHandler = async (ctx, next) => {
  logger.access.log('info', 'test');
  await next();
};

export default { transactionIdHandler };
