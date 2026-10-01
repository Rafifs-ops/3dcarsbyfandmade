import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Gameplay video ID is required.' })
  }

  const existing = await prisma.gameplayVideo.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Gameplay video not found.' })
  }

  await prisma.gameplayVideo.delete({
    where: { id }
  })

  return {
    success: true,
    message: 'Gameplay video deleted successfully'
  }
})
