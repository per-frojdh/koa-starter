import Router from 'koa-router';

import errorHandler from '../../util/errors/error-handler.mjs';
import UserService from './usersService.mjs';

const serviceContract = {
  GetAll: 'GetAllUsers',
  Test: 'Test',
};

const router = new Router({
  prefix: '/users',
});

router.get(serviceContract.GetAll, '/', async (ctx, next) => {
  const service = new UserService();
  ctx.body = service.getUsers();
});

router.get(serviceContract.Test, '/test', async (ctx, next) => {
  ctx.body = 'Hello World';
});

router.get('error', '/401', async (ctx, next) => {
  errorHandler.createBadRequestError();
});

router.get('error', '/400', async (ctx, next) => {
  errorHandler.createBadRequestError(ctx);
});

router.get('error', '/500', async (ctx, next) => {
  throw new Error('Test');
});

router.get('error', '/300', async (ctx, next) => {
  errorHandler.createBadRequestError();
});

export default { router };
