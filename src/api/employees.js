import Router from 'koa-router';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { getById, getAll, add, removeById, modifyById } from '../services/employees.js';
import config from '../config.js';

const schema = {
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
      ],
    },
    salary: {
      type: 'integer',
      minimum: 0,
    },
  },
  required: ['name', 'surname', 'role', 'salary', 'birthdate'],
  additionalProperties: false,
};
const optionalSchema = Object.assign({}, schema, { required: [] });

const validate = addFormats(new Ajv()).compile(schema);
const validateOptional = addFormats(new Ajv()).compile(optionalSchema);

export default new Router()
  .get('/', async ctx => {
    // Endpoint for listing all employees
    const page = Number.parseInt(ctx.query.page, 10) || 1;
    const employees = await getAll(ctx.query.filter, ctx.query.sorted, page,
      ctx.query.pageSize || config.pageSize);

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
      ctx.response.status = 400;
      ctx.response.body = {
        result: 'failed',
        message: 'wrong input format',
        errors: validate.errors,
      };
      return;
    }

    await add(ctx.request.body);

    ctx.response.status = 201;
    ctx.response.body = {
      result: 'ok',
      message: 'successfully added employee',
    };
  })
  .post('/:id', async ctx => {
    // Endpoint for modifying employees
    const employee = await getById(ctx.params.id);
    if (!employee) {
      ctx.throw(404, '404 Not found');
    }

    if (!validateOptional(ctx.request.body)
      || Object.keys(employee).length === 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        result: 'failed',
        message: 'wrong input format',
        errors: validateOptional.errors,
      };
      return;
    }

    const updates = ctx.request.body;
    await modifyById(ctx.params.id, updates);
    ctx.response.body = {
      result: 'ok',
      message: 'successfully updated employee',
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
      message: 'successfully deleted employee',
    };
  });
