import crypto from 'node:crypto';
import process from 'node:process';

const config = {
  // Address to bind to
  port: process.env.EMPLOYEES_PORT || '8080',

  // Port to bind to
  host: process.env.EMPLOYEES_HOST || '0.0.0.0',

  // Secret key for JWT encryption
  secretKey: process.env.EMPLOYEES_SECRET_KEY
    || crypto.randomBytes(20).toString('hex'),

  // Token time to live, seconds
  tokenTTL: process.env.EMPLOYEES_TOKEN_TTL_SECONDS || 2000,

  // PostgreSQL connection string
  pgConnectionString: process.env.EMPLOYEES_PG_CONNECTION_STRING
    || 'postgres://postgres:postgres@localhost/employees',

  // Salt that is used to hash passwords
  passwordSalt: process.env.EMPLOYEES_SALT || Date.now(),
};

export default config;
