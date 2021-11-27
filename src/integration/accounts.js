import db from './knex.js';

export async function selectAccount(username) {
  const accounts = await db('accounts').select('*').where({username});

  if (accounts.length == 0) {
    return null;
  }
  return accounts[0];
}
