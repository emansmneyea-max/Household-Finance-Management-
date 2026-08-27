import { promisify } from "node:util";
import { randomBytes, scrypt } from "node:crypto";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, 64);
  return `${salt}:${Buffer.from(derived).toString("hex")}`;
}


export async function verifyPassword(password, passwordHash) {
  const [salt, stored] = String(passwordHash).split(":");
  if (!salt || !stored) {
    return false;
  }

  const derived = await scryptAsync(password, salt, 64);
  const actual = Buffer.from(derived).toString("hex");
  return actual === stored;
}