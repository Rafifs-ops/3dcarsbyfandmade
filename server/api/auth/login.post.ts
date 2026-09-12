import bcrypt from 'bcryptjs'
import { prisma } from '../../utils/prisma'
import { signAccessToken, signRefreshToken } from '../../utils/jwt'
import { seedDatabase } from '../../utils/seedData'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body || {}

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username dan password wajib diisi.'
    })
  }

  // Ensure default admin exists if DB is completely fresh
  const userCount = await prisma.user.count().catch(() => 0)
  if (userCount === 0) {
    await seedDatabase()
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: String(username).trim() },
        { email: String(username).trim() }
      ]
    }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah.'
    })
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah.'
    })
  }

  const userPayload = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role
  }

  const accessToken = signAccessToken(userPayload)
  const refreshToken = signRefreshToken(userPayload)

  const isProduction = process.env.NODE_ENV === 'production'

  // Set cookies with httpOnly and secure
  setCookie(event, 'access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  })

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return {
    success: true,
    message: 'Login berhasil',
    user: {
      ...userPayload,
      isLogin: true
    }
  }
})
