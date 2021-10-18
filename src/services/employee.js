import knex from "knex";
import { pgConnectionString } from '../config.js';

const pg = knex({
    client: 'pg',
    connection: pgConnectionString,
})

class Employee {
    constructor(name, surname, role) {
        this.name = name;
        this.surname = surname;
        this.role = role;
    }
}

/** Returns list of all employees */
export async function getEmployees() {
    return await pg('employees').select('*');
}