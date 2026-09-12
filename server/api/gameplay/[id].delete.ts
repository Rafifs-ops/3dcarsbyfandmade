import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Video Gameplay diperlukan.' })
  }

  const existing = await prisma.gameplayVideo.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Video gameplay tidak ditemukan.' })
  }

  await prisma.gameplayVideo.delete({
    where: { id }
  })

  return {
    success: true,
    message: 'Video gameplay berhasil dihapus'
  }
})
