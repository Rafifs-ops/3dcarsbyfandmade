import { prisma } from '../../utils/prisma'
import { gameplayVideos } from '../../../app/data/gameInfo'
import { seedDatabase } from '../../utils/seedData'

export default defineEventHandler(async () => {
  try {
    const count = await prisma.gameplayVideo.count().catch(() => 0)
    if (count === 0) {
      await seedDatabase()
    }

    const items = await prisma.gameplayVideo.findMany({
      orderBy: { order: 'asc' }
    })

    return items
  } catch (error) {
    console.error('Error fetching gameplay videos from DB, fallback:', error)
    return gameplayVideos
  }
})
