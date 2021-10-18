import crypto from 'node:crypto';
import process from 'node:process';

export const port = process.env.PORT || '8080';
export const host = process.env.HOST || '0.0.0.0';
export const secretKey = process.env.SECRET_KEY || crypto.randomBytes(20).toString('hex');
export const tokenTTL = process.env.TOKEN_TTL_SECONDS || 300;
export const pgConnectionString = process.env.PG_CONNECTION_STRING
    || 'postgres://postgres:postgres@localhost/employees';
