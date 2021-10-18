import Koa from 'koa';
import { bearerToken } from 'koa-bearer-token';
import Body from 'koa-body';
import Logger from 'koa-logger';
import { host, port } from './config.js';
import router from './api/root.js';

new Koa()
    .use(new Logger())
    .use(new Body())
    .use(bearerToken())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, host, () => {
        console.log(`App listening on ${host}:${port}`);
    });
