import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET)


/**
 * Create a JWT token
 * @param userId - User ID to encode in token
 * @returns JWT token string
 */
export async function createToken(userId: number): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })  // signing algorithm
    .setExpirationTime('24h')
    .sign(secret)
}
/**
 * Verify and decode a JWT token
 * @param token - JWT token string
 * @returns Decoded token with userId, or null if invalid
 */
export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { userId: number }
  } catch (err) {
    return null
  }
}