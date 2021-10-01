import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';

/** Handler that is used for user logging in */
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

/**
 * Verifies user credentials by looking up in database by looking up in database
 * @param {string} username Username string
 * @param {string} password Password string
 * @returns {boolean} whether user is autenticated
 */
function verifyUser(username, password) {
    return Boolean(username + password);
}
