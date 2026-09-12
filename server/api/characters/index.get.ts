import { prisma } from '../../utils/prisma'
import { charactersData } from '../../../app/data/characters'
import { formatCharacter } from '../../utils/characterHelper'
import { seedDatabase } from '../../utils/seedData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category ? String(query.category) : ''
  const search = query.search ? String(query.search).toLowerCase() : ''

  try {
    const count = await prisma.character.count().catch(() => 0)
    if (count === 0) {
      await seedDatabase()
    }

    const where: any = {}
    if (category && category !== 'all') {
      where.category = category
    }

    let items = await prisma.character.findMany({
      where,
      include: { skins: true }
    })

    let formatted = items.map(formatCharacter)

    if (search) {
      formatted = formatted.filter((c: any) =>
        c.name.toLowerCase().includes(search) ||
        c.sponsor.toLowerCase().includes(search) ||
        c.categoryLabel.toLowerCase().includes(search) ||
        c.title.toLowerCase().includes(search)
      )
    }

    return formatted
  } catch (error) {
    console.error('Error fetching characters from DB, fallback to local data:', error)
    if (category && category !== 'all') {
      return charactersData.filter(c => c.category === category)
    }
    return charactersData
  }
})
