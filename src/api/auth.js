import Router from 'koa-router';
import Ajv from 'ajv';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { verifyUser } from '../services/auth.js';

const validate = new Ajv().compile({
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
  additionalProperties: false,
});

const router = new Router()
  .post('/login', async ctx => {
    // Endpoint for logging into account
    if (!validate(ctx.request.body)) {
      ctx.throw(422, '422 Incorrect username or password format');
    }

    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    if (!await verifyUser(username, password)) {
      ctx.throw(401, '401 Invalid credentials');
    }

    const token = jwt.sign({ username }, config.secretKey,
      { expiresIn: config.tokenTTL });

    ctx.response.body = { token };
  });

export default router;
