import { PrismaClient } from '@prisma/client'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const resolvedDatabaseUrl = (() => {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) return undefined
    if (!databaseUrl.startsWith('file:./')) return databaseUrl

    const relativePath = databaseUrl.slice('file:'.length)
    const absolutePath = path.resolve(serverRoot, relativePath)
    return `file:${absolutePath}`
})()

declare global {
    var __prisma: PrismaClient | undefined
}

export const prisma =
    globalThis.__prisma ??
    new PrismaClient({
        log: ['warn', 'error'],
        ...(resolvedDatabaseUrl
            ? {
                  datasources: {
                      db: {
                          url: resolvedDatabaseUrl,
                      },
                  },
              }
            : {}),
    })

if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma
}
