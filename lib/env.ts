export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Key ${key} is missing value `);
  }
  return value;
}
