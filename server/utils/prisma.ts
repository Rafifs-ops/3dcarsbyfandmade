import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

let prismaInstance: PrismaClient | null = null

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    const url = process.env.TURSO_DATABASE_URL || 'file:./dev.db'
    const authToken = process.env.TURSO_DATABASE_AUTH || process.env.TURSO_AUTH_TOKEN

    const libsql = createClient({
      url,
      authToken,
    })

    const adapter = new PrismaLibSQL(libsql)
    prismaInstance = new PrismaClient({ adapter })
  }

  return prismaInstance
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma()
    const value = (client as any)[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  }
})
