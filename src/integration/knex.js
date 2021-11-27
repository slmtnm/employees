import knex from 'knex';
import config from '../config.js';

const db = knex({
  client: 'pg',
  connection: config.pgConnectionString,
});

export default db;
