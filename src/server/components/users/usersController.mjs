import Router from 'koa-router';

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

export default { router };
