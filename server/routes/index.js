const Router = require('koa-router')

const router = new Router()

router.get('/ping', async (ctx, next) => {
  ctx.body = 'PONG'
})

module.exports = router
