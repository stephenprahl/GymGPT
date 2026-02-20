import { Hono } from 'hono'
import { prisma } from '../lib/prisma'

export const healthRouter = new Hono()

healthRouter.get('/', (c) => {
    return c.json({
        ok: true,
        service: 'gymgpt-server',
        timestamp: new Date().toISOString(),
    })
})

healthRouter.get('/ready', async (c) => {
    try {
        await prisma.$queryRaw`SELECT 1`

        return c.json({
            ok: true,
            database: 'connected',
            timestamp: new Date().toISOString(),
        })
    } catch {
        return c.json(
            {
                ok: false,
                database: 'disconnected',
                timestamp: new Date().toISOString(),
            },
            503,
        )
    }
})
