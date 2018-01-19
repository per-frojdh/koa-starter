// Adds data from .env-file into process.env
// require('dotenv')
//   .config();

import './util/errors/unhandled-errors.mjs';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import combineRouters from 'koa-combine-routers';

import logger from './util/logger';
import middlewares from './middleware';
import errorMiddlewares from './util/errors/error-middlewares.mjs';

import users from './components/users';
import organization from './components/organization';

const app = new Koa();

app
  .use(helmet())
  .use(errorMiddlewares.errorHandler)
  .use(errorMiddlewares.httpCodeHandler)
  .use(middlewares.transactionIdHandler)
  .use(bodyParser({
    enableTypes: ['form', 'urlencoded', 'json'],
  }));

const router = combineRouters([users.router, organization.router]);

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('info', `Server started on ${PORT}`));
