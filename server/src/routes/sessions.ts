import { Hono } from 'hono'

export const sessionsRouter = new Hono()

sessionsRouter.post('/start', async (c) => {
    const payload = await c.req.json().catch(() => ({}))

    return c.json({
        status: 'queued',
        message: 'Session start endpoint scaffolded.',
        payload,
    })
})

sessionsRouter.post('/:id/log-set', async (c) => {
    const payload = await c.req.json().catch(() => ({}))

    return c.json({
        status: 'queued',
        message: `Set log endpoint scaffolded for session ${c.req.param('id')}.`,
        payload,
    })
})

sessionsRouter.post('/:id/end', async (c) => {
    const payload = await c.req.json().catch(() => ({}))

    return c.json({
        status: 'queued',
        message: `Session end endpoint scaffolded for session ${c.req.param('id')}.`,
        payload,
    })
})
