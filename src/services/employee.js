import knex from 'knex';
import { pgConnectionString } from '../config.js';

const pg = knex({
    client: 'pg',
    connection: pgConnectionString,
});

/** Returns list of all employees */
export async function getEmployees() {
    return pg('employees').select('*');
}
