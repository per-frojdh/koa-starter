import nanoid from 'nanoid';

const transactionIdHandler = async (ctx, next) => {
  ctx.transaction = nanoid();
  await next();
};

export default { transactionIdHandler };
