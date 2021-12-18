import { selectById, selectAll, insert, deleteById, updateById }
  from '../integration/employees.js';

/** Returns list of all employees.
 *
 *  If filter is proveded, then returns only employees whose name/surname
 *  contains filter string.
 *
 *  If sortedBySalary is true, then returns raws sorted by salary.
 *
 */
export async function getAll(filter, sorted, page, pageSize) {
  return selectAll(filter, sorted, page, pageSize);
}

/** Returns employee with given id */
export async function getById(id) {
  const employees = await selectById(id);
  if (employees.length === 0) {
    return null;
  }

  return employees[0];
}

export async function modifyById(id, updates) {
  await updateById(id, updates);
}

/** Adds employee to list.
 *  Returns null if employee is not valid. */
export async function add(employee) {
  return insert(employee);
}

/** Deletes employee with given id.
 *  Returns true if employee deleted, false otherwise. */
export async function removeById(id) {
  return Boolean(await deleteById(id));
}
