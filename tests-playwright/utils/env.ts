export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/*
// Helper to safely access env variables
const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
};

// Helper to safely read environment variables
const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing Config: Environment variable ${name} is not set`);
    }
    return value;
};
*/