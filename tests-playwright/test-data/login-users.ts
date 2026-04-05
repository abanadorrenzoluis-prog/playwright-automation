
// Array of users for data-driven login tests
export const users = [
    { username: process.env.VALID_USERNAME || '', password: process.env.VALID_PASSWORD || '', valid: true }, //valid credentials
    { username: process.env.INVALID_USERNAME || '', password: process.env.INVALID_PASSWORD || '', valid: false }, //invalid credentials
    { username: process.env.INVALID_USERNAME || '', password: process.env.VALID_PASSWORD || '', valid: false }, //invalid username and valid password
    { username: process.env.VALID_USERNAME || '', password: process.env.INVALID_PASSWORD || '', valid: false }, //valid username and invalid password
    { username: '', password: process.env.VALID_PASSWORD || '', valid: false }, //empty username and filled password
    { username: process.env.VALID_USERNAME || '', password: '', valid: false }, //filled username and empty password
    { username: '', password: '', valid: false } //empty fields
];