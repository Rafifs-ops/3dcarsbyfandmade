import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const { id, title, category, youtubeId, duration, game, description, order } = body || {}

  if (!title || !youtubeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Judul dan ID YouTube wajib diisi.'
    })
  }

  const generatedId = id || title.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

  const maxOrder = await prisma.gameplayVideo.aggregate({
    _max: { order: true }
  })
  const nextOrder = order !== undefined ? Number(order) : ((maxOrder._max.order ?? 0) + 1)

  // Clean youtubeId if full URL was pasted
  let cleanedYoutubeId = youtubeId.trim()
  if (cleanedYoutubeId.includes('v=')) {
    cleanedYoutubeId = cleanedYoutubeId.split('v=')[1]?.split('&')[0] || cleanedYoutubeId
  } else if (cleanedYoutubeId.includes('youtu.be/')) {
    cleanedYoutubeId = cleanedYoutubeId.split('youtu.be/')[1]?.split('?')[0] || cleanedYoutubeId
  }

  const created = await prisma.gameplayVideo.create({
    data: {
      id: generatedId,
      title,
      category: category || 'Gameplay Showcase',
      youtubeId: cleanedYoutubeId,
      duration: duration || '03:00',
      game: game || 'Disney•Pixar Cars',
      description: description || '',
      order: nextOrder
    }
  })

  return {
    success: true,
    message: 'Video gameplay berhasil ditambahkan',
    data: created
  }
})
