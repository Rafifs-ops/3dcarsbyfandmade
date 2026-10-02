import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

let prismaInstance: PrismaClient | null = null

export function getPrisma(): PrismaClient {
  const config = useRuntimeConfig()

  if (!prismaInstance) {
    const url = config.tursoDatabaseUrl
    const authToken = config.tursoDatabaseAuth

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
