import jwt from 'jsonwebtoken';
import { secretKey, tokenTTL } from './config.js';

export async function jwtPass(ctx, next) {
    if (!ctx.request.token) {
        ctx.throw(401, '401 Unauthorized\n');
    }

    let payload;
    try {
        payload = jwt.verify(ctx.request.token, secretKey);
    } catch (error) {
        ctx.throw(401, `401 ${error}\n`);
    }

    if ((Date.now() - payload.timestamp) / 1000 > tokenTTL) {
        ctx.throw(401, '401 Token expired\n');
    }

    await next();
}
