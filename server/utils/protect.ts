import { H3Event, createError, getCookie, getHeader } from 'h3'
import { verifyJwtToken, type JwtUserPayload } from './jwt'

export function requireAdminAuth(event: H3Event): JwtUserPayload {
  const cookieToken = getCookie(event, 'access_token')
  const authHeader = getHeader(event, 'authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

  const token = cookieToken || bearerToken

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Session not found. Please log in again.',
    })
  }

  const payload = verifyJwtToken(token)

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Token is invalid or has expired.',
    })
  }

  return payload
}
