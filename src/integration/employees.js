import db from './knex.js';

export async function selectById(id) {
  return db('employees').select('*').where({id})
}

export async function selectAll() {
  return db('employees').select('*');
}

export async function insert(employee) {
  return db('employees').insert(employee);
}

export async function deleteById(id) {
  const result = await db('employees').where({id}).del();
  console.log(`result=${result}`);
  return result;
}
