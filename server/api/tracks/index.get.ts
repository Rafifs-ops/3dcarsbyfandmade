import { prisma } from '../../utils/prisma'
import { circuitsData } from '../../../app/data/tracks'
import { seedDatabase } from '../../utils/seedData'

export default defineEventHandler(async () => {
  try {
    const count = await prisma.trackCircuit.count().catch(() => 0)
    if (count === 0) {
      await seedDatabase()
    }

    const items = await prisma.trackCircuit.findMany({
      orderBy: { order: 'asc' }
    })

    return items
  } catch (error) {
    console.error('Error fetching tracks from DB, fallback to local data:', error)
    return circuitsData
  }
})
