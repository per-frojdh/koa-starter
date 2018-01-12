import nanoid from 'nanoid';

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};

const transactionIdHandler = async (ctx, next) => {
  ctx.transaction = nanoid();
  await next();
};

export default { errorHandler, transactionIdHandler };
