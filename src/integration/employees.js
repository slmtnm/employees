import db from './knex.js';

export async function selectById(id) {
  return db('employees').select('*').where({id})
}

export async function selectAll(filter, sortBySalary) {
  let promise = db('employees').select('*');

  if (filter) {
    filter = filter.toLowerCase();
    promise = promise
      .whereRaw('LOWER("name") LIKE ?', `%${filter}%`)
      .orWhereRaw('LOWER("surname") LIKE ?', `%${filter}%`);
  }

  if (sortBySalary == 'true') {
    promise = promise.orderBy('salary', 'asc');
  }

  return promise;
}

export async function insert(employee) {
  return db('employees').insert(employee);
}

export async function deleteById(id) {
  const result = await db('employees').where({id}).del();
  console.log(`result=${result}`);
  return result;
}
