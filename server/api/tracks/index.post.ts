import { prisma } from '../../utils/prisma'
import { requireAdminAuth } from '../../utils/protect'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const { id, name, surfaceType, description, image, ambientColor, order } = body || {}

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nama sirkuit dan deskripsi wajib diisi.'
    })
  }

  const generatedId = id || name.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

  const maxOrder = await prisma.trackCircuit.aggregate({
    _max: { order: true }
  })
  const nextOrder = order !== undefined ? Number(order) : ((maxOrder._max.order ?? 0) + 1)

  const created = await prisma.trackCircuit.create({
    data: {
      id: generatedId,
      name,
      surfaceType: surfaceType || 'Asphalt',
      description,
      image: image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      ambientColor: ambientColor || '#E11D2A',
      order: nextOrder
    }
  })

  return {
    success: true,
    message: 'Sirkuit berhasil ditambahkan',
    data: created
  }
})
