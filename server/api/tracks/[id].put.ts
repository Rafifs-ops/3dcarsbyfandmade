import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID Sirkuit diperlukan.' })
  }

  const existing = await prisma.trackCircuit.findUnique({
    where: { id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Sirkuit tidak ditemukan.' })
  }

  const body = await readBody(event)
  const { name, surfaceType, description, image, ambientColor, order } = body || {}

  const updated = await prisma.trackCircuit.update({
    where: { id },
    data: {
      name: name !== undefined ? name : existing.name,
      surfaceType: surfaceType !== undefined ? surfaceType : existing.surfaceType,
      description: description !== undefined ? description : existing.description,
      image: image !== undefined ? image : existing.image,
      ambientColor: ambientColor !== undefined ? ambientColor : existing.ambientColor,
      order: order !== undefined ? Number(order) : existing.order
    }
  })

  return {
    success: true,
    message: 'Sirkuit berhasil diperbarui',
    data: updated
  }
})
