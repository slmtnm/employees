import Koa from 'koa';
import Logger from 'koa-logger';
import Router from 'koa-router';
import Body from 'koa-body';
import {loginHandler, signinHandler} from './api/auth.js';
import {getEmployeeHandler} from './api/employee.js';
import {getVersionHandler} from './api/version.js';
import {host, port} from './config.js';

const app = new Koa();

// Register API endpoint handlers
const publicRouter = new Router();
publicRouter
    .get('/api/version', getVersionHandler)
    .post('/api/signin', signinHandler)
    .post('/api/login', loginHandler);

const protectedRouter = new Router();
protectedRouter.get('/api/employee', getEmployeeHandler);

// Register all application middleware and start app
app
    .use(new Logger())
    .use(new Body())
    .use(publicRouter.routes())
    .use(publicRouter.allowedMethods())
    .use(async (ctx, next) => {
        await next();
    })
    .use(protectedRouter.routes())
    .use(protectedRouter.allowedMethods())
    .listen(port, host, () => {
        console.log(`App listening on ${host}:${port}`);
    });
