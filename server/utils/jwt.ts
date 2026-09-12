import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'aretha'

export interface JwtUserPayload {
  id: string
  username: string
  name: string
  role: string
}

export function signAccessToken(payload: JwtUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function signRefreshToken(payload: JwtUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyJwtToken(token: string): JwtUserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload
    return decoded
  } catch {
    return null
  }
}
