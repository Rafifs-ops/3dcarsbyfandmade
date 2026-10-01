import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'News ID is required.' })
  }

  const existing = await prisma.news.findFirst({
    where: {
      OR: [{ id }, { slug: id }]
    }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'News not found.' })
  }

  await prisma.news.delete({
    where: { id: existing.id }
  })

  return {
    success: true,
    message: 'News deleted successfully'
  }
})
