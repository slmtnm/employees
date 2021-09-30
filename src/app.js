const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const logger = require('koa-logger');
const jwt = require('koa-jwt');

const config = require('./config');

const versionApi = require('./api/version');
const authApi = require('./api/auth');
const employeeApi = require('./api/employee');

// Register API endpoint handlers
const publicRouter = new Router();
publicRouter.get('/api/version', versionApi.getVersionHandler);
publicRouter.post('/api/signin', authApi.signinHandler);
publicRouter.post('/api/login', authApi.loginHandler);

const protectedRouter = new Router();
protectedRouter.get('/api/employee', employeeApi.getEmployee);

// Register all application middleware and start app
app
  .use(logger())
  .use(publicRouter.routes())
  .use(publicRouter.allowedMethods())
  .use(jwt({
    secret: 'shared-secret',
  }))
  .use(protectedRouter.routes())
  .use(protectedRouter.allowedMethods())
  .listen(config.port, config.host, () => {
    console.log(`App listening on ${config.host}:${config.port}`);
  });
