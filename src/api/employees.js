import Router from 'koa-router';
import * as EmployeeService from '../services/employee.js';

const router = new Router()
    .get('/', async ctx => {
        ctx.response.body = await EmployeeService.list();
    })
    .get('/:id', async ctx => {
        ctx.response.body = await EmployeeService.get(ctx.params.id);
    })
    .post('/', async _ => {})
    .post('/:id', async _ => {});

export default router;
