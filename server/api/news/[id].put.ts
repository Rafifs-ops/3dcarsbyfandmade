import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Berita diperlukan.' })
  }

  const body = await readBody(event)
  const { title, slug, excerpt, content, author, date, image, isFeatured } = body || {}

  const existing = await prisma.news.findFirst({
    where: {
      OR: [{ id }, { slug: id }]
    }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan.' })
  }

  const updated = await prisma.news.update({
    where: { id: existing.id },
    data: {
      title: title !== undefined ? title : existing.title,
      slug: slug !== undefined ? slug : existing.slug,
      excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
      content: content !== undefined ? content : existing.content,
      author: author !== undefined ? author : existing.author,
      date: date !== undefined ? date : existing.date,
      image: image !== undefined ? image : existing.image,
      isFeatured: isFeatured !== undefined ? (isFeatured === true || isFeatured === 'true') : existing.isFeatured
    }
  })

  return {
    success: true,
    message: 'Berita berhasil diperbarui',
    data: updated
  }
})
