import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import assertToken from '../middleware/jwt.js';
import authRouter from './auth.js';
import employeesRouter from './employees.js';

export default new Router()
  .get('/swagger', koaSwagger({
    routePrefix: false, 
    swaggerOptions: {spec: yamljs.load('src/api/swagger.yml')}
  }))
  .use('/api/auth', authRouter.routes(), authRouter.allowedMethods())
  .use(assertToken)
  .use('/api/employees', employeesRouter.routes(), 
    employeesRouter.allowedMethods());
