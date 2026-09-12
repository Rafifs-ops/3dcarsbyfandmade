import { prisma } from '../../utils/prisma'
import { newsData } from '../../../app/data/news'
import { seedDatabase } from '../../utils/seedData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = query.search ? String(query.search).toLowerCase() : ''
  const featuredOnly = query.featured === 'true'

  try {
    const count = await prisma.news.count().catch(() => 0)
    if (count === 0) {
      await seedDatabase()
    }

    const where: any = {}
    if (featuredOnly) {
      where.isFeatured = true
    }

    let items = await prisma.news.findMany({
      where,
      orderBy: { date: 'desc' }
    })

    if (search) {
      items = items.filter(n =>
        n.title.toLowerCase().includes(search) ||
        n.excerpt.toLowerCase().includes(search) ||
        n.author.toLowerCase().includes(search)
      )
    }

    return items
  } catch (error) {
    console.error('Error fetching news from DB, fallback to local data:', error)
    return newsData
  }
})
