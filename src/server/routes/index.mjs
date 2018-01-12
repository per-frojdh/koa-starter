import Router from 'koa-router';

const router = new Router();

router.get('/ping', async (ctx, next) => {
  ctx.body = 'PONG';
});

export default router;
