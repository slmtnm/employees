import jwt from 'jsonwebtoken';
import config from '../config.js';

/** JWT middleware function
 * Checks whether JWT token is present, is valid and is not expired.
*/
async function assertToken(ctx, next) {
  try {
    if (!ctx.request.token) {
      ctx.throw(401, 'Unauthorized (no token passed)');
    }

    jwt.verify(ctx.request.token, config.secretKey);
  } catch (error) {
    ctx.throw(401, `401 ${error}\n`);
  }

  await next();
}

export default assertToken;
