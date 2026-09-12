import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Berita diperlukan.' })
  }

  const existing = await prisma.news.findFirst({
    where: {
      OR: [{ id }, { slug: id }]
    }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan.' })
  }

  await prisma.news.delete({
    where: { id: existing.id }
  })

  return {
    success: true,
    message: 'Berita berhasil dihapus'
  }
})
