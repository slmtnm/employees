import Router from 'koa-router';
import Ajv from 'ajv';
import addFormats from 'ajv-formats'
import { getById, getAll, add, removeById } from '../services/employees.js';

const validate = addFormats(new Ajv()).compile({
  type: 'object',
  properties: {
    name: { 
      type: 'string',
      maxLength: 100,
    },
    surname: { 
      type: 'string',
      maxLength: 100,
    },
    birthdate: { 
      type: 'string',
      format: 'date',
    },
    role: { 
      enum: [
        'Junior Software Engineer',
        'Software Engineer',
        'Senior Software Engineer',
        'Lead Software Engineer',
      ] 
    },
    salary: { 
      type: 'integer',
      minimum: 0,
    },
  },
  required: ['name', 'surname', 'role', 'salary', 'birthdate'],
  additionalProperties: false,
});

const router = new Router()
  .get('/', async ctx => {
    // Endpoint for listing all employees
    const employees = await getAll();
    ctx.response.body = employees;
  })
  .get('/:id', async ctx => {
    // Endpoint for fetching specific employee by id
    const employee = await getById(ctx.params.id);
    if (!employee) {
      ctx.throw(404, '404 Not found');
    }

    ctx.response.body = employee;
  })
  .post('/', async ctx => {
    // Endpoint for adding employees
    if (!validate(ctx.request.body)) {
      ctx.throw(422, 'Wrong input');
    }

    await add(ctx.request.body);
    ctx.response.body = { 
      result: 'ok',
      message: 'successfully added employee' 
    };
  })
  .delete('/:id', async ctx => {
    // Endpoint for deleting employee by id
    const employee = await removeById(ctx.params.id);
    if (!employee) {
      ctx.throw(404, '404 Not found');
    }

    ctx.response.body = {
      result: 'ok',
      message: 'successfully deleted employee'
    };
  });

export default router;
