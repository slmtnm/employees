import db from './knex.js';

export async function selectById(id) {
  return db('employees').select('*').where({ id });
}

export async function count() {
  return db('employees').count('*');
}

export async function selectAll(filter, sorted, page, pageSize) {
  const totalPages = Math.floor(await count() / pageSize);
  if (page > totalPages) {
    page = totalPages;
  } else if (page < 1) {
    page = 1;
  }

  let promise = db('employees').select('*');

  // Paging
  promise = promise
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  // Filtering
  if (filter) {
    filter = filter.toLowerCase();
    promise = promise
      .whereRaw('LOWER("name") LIKE ?', `%${filter}%`)
      .orWhereRaw('LOWER("surname") LIKE ?', `%${filter}%`);
  }

  // Sorting
  if (sorted === 'asc' || sorted === 'desc') {
    promise = promise.orderBy('salary', sorted);
  }

  return promise;
}

export async function insert(employee) {
  return db('employees').insert(employee);
}

export async function deleteById(id) {
  return db('employees').where({ id }).del();
}

export async function updateById(id, updates) {
  await db('employees')
    .where({ id })
    .update(updates);
}
