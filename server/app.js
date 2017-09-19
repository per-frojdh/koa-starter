const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const helmet = require('koa-helmet')

const router = require('./routes')
const middlewares = require('./middleware')

const app = new Koa()

app
  .use(morgan('tiny'))
  .use(helmet())

app
  .use(middlewares.errorHandler)
  .use(bodyParser({
    enableTypes: ['form', 'urlencoded', 'json']
  }))

app.use(router.routes())

console.log(router.stack)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))
