import process from 'node:process';

export const port = process.env.PORT || '8080';
export const host = process.env.HOST || '0.0.0.0';
export const secretKey = process.env.SECRET_KEY;
