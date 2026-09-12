import { verifyJwtToken, signAccessToken } from '../../utils/jwt'

export default defineEventHandler((event) => {
  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  if (accessToken) {
    const payload = verifyJwtToken(accessToken)
    if (payload) {
      return {
        isLogin: true,
        user: {
          id: payload.id,
          username: payload.username,
          name: payload.name,
          role: payload.role,
          isLogin: true
        }
      }
    }
  }

  // If access_token expired or invalid, try to refresh via refresh_token
  if (refreshToken) {
    const refreshPayload = verifyJwtToken(refreshToken)
    if (refreshPayload) {
      const userPayload = {
        id: refreshPayload.id,
        username: refreshPayload.username,
        name: refreshPayload.name,
        role: refreshPayload.role
      }
      const newAccessToken = signAccessToken(userPayload)
      setCookie(event, 'access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
      })

      return {
        isLogin: true,
        user: {
          ...userPayload,
          isLogin: true
        }
      }
    }
  }

  // Not logged in or invalid token
  return {
    isLogin: false,
    user: null
  }
})
