import { prisma } from '../../utils/prisma'
import { gameplayVideos } from '../../../app/data/gameInfo'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Video Gameplay diperlukan' })
  }

  try {
    const item = await prisma.gameplayVideo.findUnique({
      where: { id }
    })

    if (item) return item

    const localItem = gameplayVideos.find(v => v.id === id)
    if (localItem) return localItem

    throw createError({ statusCode: 404, statusMessage: 'Video gameplay tidak ditemukan' })
  } catch (error: any) {
    if (error.statusCode) throw error
    const localItem = gameplayVideos.find(v => v.id === id)
    if (localItem) return localItem
    throw createError({ statusCode: 404, statusMessage: 'Video gameplay tidak ditemukan' })
  }
})
