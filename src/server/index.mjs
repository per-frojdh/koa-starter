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

const router = combineRouters([users.router, organization.router]);

// Request related middlewares, ie. middlewares operating on the context
// before it has been passed into a router and towards the request process.
app
  .use(helmet())
  .use(middlewares.responseTimeHandler)
  .use(middlewares.transactionIdHandler)
  .use(middlewares.accessLoggerHandler)
  .use(bodyParser({
    enableTypes: ['form', 'urlencoded', 'json'],
  }))
  .use(errorMiddlewares.errorHandler)
  .use(router)
  .use(errorMiddlewares.httpCodeHandler);

// Response related middlewares
// app.use(errorMiddlewares.httpCodeHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('info', `Server started on ${PORT}`));
