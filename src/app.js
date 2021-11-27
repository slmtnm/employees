import Koa from 'koa';
import { bearerToken } from 'koa-bearer-token';
import Body from 'koa-body';
import Logger from 'koa-logger';
import config from './config.js';
import router from './api/root.js';

new Koa()
  .use(new Body())
  .use(new Logger())
  .use(bearerToken())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, config.host, () => {
    console.log(`listening on ${config.host}:${config.port}`);
  });
