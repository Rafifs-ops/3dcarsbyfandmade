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

  const body = await readBody(event)
  const { title, category, youtubeId, duration, game, description, order } = body || {}

  let cleanedYoutubeId = youtubeId !== undefined ? youtubeId.trim() : existing.youtubeId
  if (cleanedYoutubeId.includes('v=')) {
    cleanedYoutubeId = cleanedYoutubeId.split('v=')[1]?.split('&')[0] || cleanedYoutubeId
  } else if (cleanedYoutubeId.includes('youtu.be/')) {
    cleanedYoutubeId = cleanedYoutubeId.split('youtu.be/')[1]?.split('?')[0] || cleanedYoutubeId
  }

  const updated = await prisma.gameplayVideo.update({
    where: { id },
    data: {
      title: title !== undefined ? title : existing.title,
      category: category !== undefined ? category : existing.category,
      youtubeId: cleanedYoutubeId,
      duration: duration !== undefined ? duration : existing.duration,
      game: game !== undefined ? game : existing.game,
      description: description !== undefined ? description : existing.description,
      order: order !== undefined ? Number(order) : existing.order
    }
  })

  return {
    success: true,
    message: 'Video gameplay berhasil diperbarui',
    data: updated
  }
})
