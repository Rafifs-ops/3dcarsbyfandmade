import { seedDatabase } from '../utils/seedData'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event).catch(() => ({}))
    const force = body?.force === true
    const result = await seedDatabase(force)
    return result
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'Failed to seed database'
    })
  }
})
