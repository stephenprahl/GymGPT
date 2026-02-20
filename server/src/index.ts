import { Hono } from 'hono'
import { feedbackRouter } from './routes/feedback'
import { healthRouter } from './routes/health'
import { plansRouter } from './routes/plans'
import { sessionsRouter } from './routes/sessions'
import { usersRouter } from './routes/users'

const app = new Hono()

app.route('/health', healthRouter)
app.route('/api/feedback', feedbackRouter)
app.route('/api/plans', plansRouter)
app.route('/api/sessions', sessionsRouter)
app.route('/api/users', usersRouter)

app.onError((error, c) => {
  console.error(error)

  return c.json(
    {
      ok: false,
      message: 'Internal server error',
      error: error.message,
    },
    500,
  )
})

app.notFound((c) => {
  return c.json(
    {
      ok: false,
      message: 'Route not found',
    },
    404,
  )
})

export default app
