import Router from "koa-router";
import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js'

function verifyUser(username, password) {
    return Boolean(username + password);
}

export async function loginHandler(ctx) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    if (!verifyUser(username, password)) {
        ctx.throw(401, '401 Invalid login or password');
    }

    const token = jwt.sign({
        username,
        timestamp: Date.now(),
    }, secretKey);

    ctx.response.body = token;
}

const router = new Router()
    .post('/login', loginHandler);

export default router;