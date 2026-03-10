import bcrypt from "bcrypt";


/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain text password with hashed password
 * @param password - Plain text password from user
 * @param hashedPassword - Hashed password from database
 * @returns true if passwords match, false otherwise
 */
export async function verifyFunction(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
