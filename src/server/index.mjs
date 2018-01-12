// Adds data from .env-file into process.env
// require('dotenv')
//   .config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

import logger from './util/logger';
import router from './routes';
import middlewares from './middleware';

const app = new Koa();

app
  .use(helmet())
  .use(middlewares.errorHandler)
  .use(middlewares.transactionIdHandler)
  .use(bodyParser({
    enableTypes: ['form', 'urlencoded', 'json'],
  }));

app.use(router.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.log('info', `Server started on ${PORT}`));
