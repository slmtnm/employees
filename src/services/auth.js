import crypto from 'node:crypto';
import { selectAccount } from '../integration/accounts.js';

/** Computes SHA-512 hash of given string */
function hash(string, salt) {
  const hashedPassword = crypto
    .createHash('sha512')
    .update(string + salt)
    .digest('hex');
  return `sha512$${salt}$${hashedPassword}`;
}

/** Verifies that user with given username and password exists.
 * Returns true when user is valid, false otherwise. */
export async function verifyUser(username, password) {
  const account = await selectAccount(username);
  if (!account) {
    return false; // Invalid login
  }

  const [_algo, salt, _passhash] = account.passhash.split('$');
  return account.passhash === hash(password, salt); // Invalid password
}
