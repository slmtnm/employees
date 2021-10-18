import Router from 'koa-router';
import assertToken from '../middleware/jwt.js';
import authRouter from './auth.js';
import employeesRouter from './employees.js';

const router = new Router()
    .use('/api/auth', authRouter.routes(), authRouter.allowedMethods())
    .use(assertToken)
    .use('/api/employees', employeesRouter.routes(), employeesRouter.allowedMethods());

export default router;
