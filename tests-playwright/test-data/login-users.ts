// Array of users for data-driven login tests
export const users = [
  { username: 'validUser', password: 'validPass', valid: true },
  { username: 'invalidUser', password: 'invalidPass', valid: false },
  { username: 'invalidUser', password: 'validPass', valid: false },
  { username: 'validUser', password: 'invalidPass', valid: false },
  { username: '', password: '', valid: false },
  { username: '', password: 'validPass', valid: false },
  { username: 'validUser', password: '', valid: false }
];

