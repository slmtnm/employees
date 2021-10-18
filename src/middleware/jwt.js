import jwt from 'jsonwebtoken';
import { secretKey, tokenTTL } from '../config.js';

/** JWT middleware function
 * Checks whether JWT token is present, is valid and is not expired.
*/
async function assertToken(ctx, next) {
    try {
        if (!ctx.request.token) {
            throw 'Unauthorized';
        }

        const { timestamp } = jwt.verify(ctx.request.token, secretKey);
        if ((Date.now() - timestamp) / 1000 > tokenTTL) {
            throw 'Token expired';
        }
    } catch (error) {
        ctx.throw(401, `401 ${error}\n`);
    }

    await next();
}

export default assertToken;