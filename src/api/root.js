import Router from 'koa-router';
import swagger from 'swagger2';
import swaggerKoa from 'swagger2-koa';
import assertToken from '../middleware/jwt.js';
import authRouter from './auth.js';
import employeesRouter from './employees.js';

const swaggerDoc = swagger.loadDocumentSync('src/api/api.yml');

const router = new Router()
    .get('/health', async ctx => {
        ctx.response.body = {status: 'UP'};
    })
    .use(swaggerKoa.ui(swaggerDoc, '/swagger'))
    .use('/api/auth', authRouter.routes(), authRouter.allowedMethods())
    .use(assertToken)
    .use('/api/employees', employeesRouter.routes(), employeesRouter.allowedMethods());

export default router;
