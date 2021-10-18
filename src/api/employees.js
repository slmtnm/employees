import Router from "koa-router";
import { getEmployees } from "../services/employee.js"; 

const router = new Router()
    .get('/', async (ctx) => {
        const employees = await getEmployees();
        ctx.response.body = JSON.stringify(employees);
    })

export default router;