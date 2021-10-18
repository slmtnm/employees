import Router from 'koa-router'
import authRouter from './auth.js'
import employeesRouter from './employees.js'
import assertToken from '../middleware/jwt.js';

const router = new Router()
    .use('/api/auth', authRouter.routes(), authRouter.allowedMethods())
    .use(assertToken)
    .use('/api/employees', employeesRouter.routes(), employeesRouter.allowedMethods());

export default router;
