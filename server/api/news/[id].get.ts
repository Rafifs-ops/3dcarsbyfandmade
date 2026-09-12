import { prisma } from '../../utils/prisma'
import { newsData } from '../../../app/data/news'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID / Slug diperlukan' })
  }

  try {
    const item = await prisma.news.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    })

    if (item) return item

    const localItem = newsData.find(n => n.id === id || n.slug === id)
    if (localItem) return localItem

    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' })
  } catch (error: any) {
    if (error.statusCode) throw error
    const localItem = newsData.find(n => n.id === id || n.slug === id)
    if (localItem) return localItem
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' })
  }
})
