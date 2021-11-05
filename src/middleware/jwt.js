import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';

/** JWT middleware function
 * Checks whether JWT token is present, is valid and is not expired.
*/
async function assertToken(ctx, next) {
    if (!ctx.request.token) {
        ctx.throw(401, 'Unauthorized (no token passed)');
    }

    try {
        jwt.verify(ctx.request.token, secretKey);
    } catch {
        ctx.throw(401, '401 Invalid or expired token\n');
    }

    await next();
}

export default assertToken;
