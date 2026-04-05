// Array of users for data-driven login tests
export const users = [
    { username: 'test.john.doe@example.com', password: 'Password123!', valid: true }, //valid credentials
    { username: 'test.johnny.doe@example.com', password: 'Password123@', valid: false }, //invalid credentials
    { username: 'test.johnny.doe@example.com', password: 'Password123!', valid: false }, //invalid username and valid password
    { username: 'test.john.doe@example.com', password: 'Password123@', valid: false }, //valid username and invalid password
    { username: '', password: 'Password123!', valid: false }, //empty username and filled password
    { username: 'test.john.doe@example.com', password: '', valid: false }, //filled username and empty password
    { username: '', password: '', valid: false } //empty fields
];