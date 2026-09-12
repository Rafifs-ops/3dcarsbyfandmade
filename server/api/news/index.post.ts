import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const { title, slug, excerpt, content, author, date, image, isFeatured } = body || {}

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Judul dan konten berita wajib diisi.'
    })
  }

  const generatedSlug = slug
    ? String(slug).toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
    : title.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

  const created = await prisma.news.create({
    data: {
      title,
      slug: generatedSlug,
      excerpt: excerpt || '',
      content: content || '',
      author: author || 'Admin',
      date: date || new Date().toISOString().split('T')[0],
      image: image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      isFeatured: isFeatured === true || isFeatured === 'true'
    }
  })

  return {
    success: true,
    message: 'Berita berhasil ditambahkan',
    data: created
  }
})
