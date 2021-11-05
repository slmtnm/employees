import knex from 'knex';
import { pgConnectionString } from '../config.js';

const pg = knex({
    client: 'pg',
    connection: pgConnectionString,
});

export const create = async (fields) => 
    pg('employees')
        .returning('id')
        .insert(fields)

export const remove = async (id) => pg('employees').where({id}).del();

export const list = async () => pg('employees').select('*');