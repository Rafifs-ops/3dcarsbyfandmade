import { prisma } from '../../utils/prisma'
import { cars1Spec, cars2Spec } from '../../../app/data/gameInfo'
import { seedDatabase } from '../../utils/seedData'

export function formatGameSpec(spec: any) {
  if (!spec) return null
  return {
    id: spec.id,
    title: spec.title,
    releaseYear: spec.releaseYear,
    developer: spec.developer,
    publisher: spec.publisher,
    genre: spec.genre,
    steamAppId: spec.steamAppId,
    steamUrl: spec.steamUrl,
    coverUrl: spec.coverUrl,
    summary: spec.summary,
    minimumSpecs: {
      os: spec.os,
      processor: spec.processor,
      memory: spec.memory,
      graphics: spec.graphics,
      directx: spec.directx,
      storage: spec.storage
    }
  }
}

export default defineEventHandler(async () => {
  try {
    const count = await prisma.gameSpec.count().catch(() => 0)
    if (count === 0) {
      await seedDatabase()
    }

    const items = await prisma.gameSpec.findMany({
      orderBy: { releaseYear: 'asc' }
    })

    return items.map(formatGameSpec)
  } catch (error) {
    console.error('Error fetching game specs from DB, fallback:', error)
    return [
      { id: 'cars-1', ...cars1Spec },
      { id: 'cars-2', ...cars2Spec }
    ]
  }
})
