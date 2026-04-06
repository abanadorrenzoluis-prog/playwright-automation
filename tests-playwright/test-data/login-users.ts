import {getEnvVar} from '../utils/env';

// Type definition for better structure and safety
type Credentials = {
    username: string;
    password: string;
};

type UserTestData = Credentials & {
    valid: boolean;
};

// Valid credentials (from .env - sensitive)
export const VALID_CREDENTIALS: Credentials = {
    username: getEnvVar('VALID_USERNAME'),
    password: getEnvVar('VALID_PASSWORD')
};

// Invalid credentials
export const INVALID_CREDENTIALS = {
    empty: { username: '', password: '' },
    wrongUserPass: { username: 'nonexisting_user', password: 'wrong_password' },
    wrongUsername: { username: 'nonexisting_user', password: VALID_CREDENTIALS.password },
    wrongPassword: { username: VALID_CREDENTIALS.username, password: 'wrong_password' }
};

// Data-driven test users
export const users: UserTestData[] = [
    // Valid login
    { ...VALID_CREDENTIALS, valid: true },

    // Invalid combinations
    { ...INVALID_CREDENTIALS.wrongUserPass, valid: false },
    { ...INVALID_CREDENTIALS.wrongUsername, valid: false },
    { ...INVALID_CREDENTIALS.wrongPassword, valid: false },
    

    // Empty cases
    { username: VALID_CREDENTIALS.username, password: '', valid: false },
    { username: '', password: VALID_CREDENTIALS.password, valid: false },
    { ...INVALID_CREDENTIALS.empty, valid: false }
];