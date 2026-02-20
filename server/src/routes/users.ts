import { Hono } from 'hono'

export const usersRouter = new Hono()

usersRouter.get('/:id/progress', (c) => {
    return c.json({
        status: 'queued',
        message: `User progress endpoint scaffolded for user ${c.req.param('id')}.`,
    })
})
