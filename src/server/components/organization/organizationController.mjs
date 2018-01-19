import Router from 'koa-router';

const serviceContract = {
  HelloWorld: 'HelloWorld',
  Test: 'Test',
};

const router = new Router({
  prefix: '/organization',
});

router.get(serviceContract.HelloWorld, '/', async (ctx, next) => {
  ctx.body = { Foo: 'bar' };
});

router.get(serviceContract.Test, '/test', async (ctx, next) => {
  ctx.body = 'Hello World';
});

export default { router };
