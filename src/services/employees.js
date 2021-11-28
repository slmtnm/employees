import { selectById, selectAll, insert, deleteById } 
  from '../integration/employees.js';

/** Returns list of all employees.
 * 
 *  If filter is proveded, then returns only employees whose name/surname
 *  contains filter string.
 * 
 *  If sortedBySalary is true, then returns raws sorted by salary.
 * 
 */
export async function getAll(filter, sortedBySalary) {
  return selectAll(filter, sortedBySalary);
}

/** Returns employee with given id */
export async function getById(id) {
  const employees = await selectById(id);
  if (employees.length == 0) {
    return null;
  }
  return employees[0];
}

/** Returns sorted list of all employees */
export async function getAllSorted() {
  const all = await selectAll();

  all.sort((em1, em2) => {
    const s1 = (em1.surname + em1.name).toLowerCase();
    const s2 = (em2.surname + em2.name).toLowerCase();

    return s1 < s2 ? -1 : +Number(s1 > s2);
  });

  return all;
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
