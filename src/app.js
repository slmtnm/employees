import Koa from 'koa';
import { bearerToken } from 'koa-bearer-token';
import Body from 'koa-body';
import Logger from 'koa-logger';
import Router from 'koa-router';
import { loginHandler } from './api/auth.js';
import { getEmployeeHandler } from './api/employee.js';
import { getVersionHandler } from './api/version.js';
import { host, port } from './config.js';
import { jwtPass } from './jwt.js';

const app = new Koa();

// Register API endpoint handlers
const publicRouter = new Router();
publicRouter
    .get('/api/version', getVersionHandler)
    .post('/api/login', loginHandler);

const protectedRouter = new Router();
protectedRouter.get('/api/employee', getEmployeeHandler);

// Register all application middleware and start app
app
    .use(new Logger())
    .use(new Body())
    .use(bearerToken())
    .use(publicRouter.routes())
    .use(publicRouter.allowedMethods())
    .use(jwtPass)
    .use(protectedRouter.routes())
    .use(protectedRouter.allowedMethods())
    .listen(port, host, () => {
        console.log(`App listening on ${host}:${port}`);
    });
