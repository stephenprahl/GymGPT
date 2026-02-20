import { Hono } from 'hono'
import { askOllama } from '../lib/ollama'
import { prisma } from '../lib/prisma'
import { buildFormFeedbackPrompt } from '../prompts/form-feedback'

export const feedbackRouter = new Hono()

const buildFallbackGuidance = (exerciseOrMachine: string, observed: string) => {
    return `Quick coaching fallback for ${exerciseOrMachine}: based on "${observed}", reduce load 5-10%, slow your tempo, and keep reps controlled through a pain-free range. If discomfort persists, stop and reassess setup/form.`
}

feedbackRouter.post('/form', async (c) => {
    const payload = await c.req
        .json<{
            userId: string
            exercise: string
            observed: string
            machine?: string
            sessionId?: string
        }>()
        .catch(() => null)

    if (!payload?.userId || !payload.exercise || !payload.observed) {
        return c.json({ ok: false, message: 'userId, exercise, and observed are required.' }, 400)
    }

    await prisma.user.upsert({
        where: { id: payload.userId },
        update: {},
        create: {
            id: payload.userId,
            email: `${payload.userId}@gymgpt.local`,
            displayName: 'Gymgpt User',
        },
    })

    const messages = buildFormFeedbackPrompt({
        exercise: payload.exercise,
        observed: payload.observed,
        machine: payload.machine,
    })

    let guidance = ''

    try {
        guidance = await askOllama(messages)
    } catch {
        guidance = buildFallbackGuidance(payload.exercise, payload.observed)
    }

    await prisma.feedbackEvent.create({
        data: {
            userId: payload.userId,
            sessionId: payload.sessionId,
            feedbackType: 'FORM',
            verdict: guidance.includes('needs correction') ? 'needs correction' : 'good',
            guidance,
        },
    })

    return c.json({
        ok: true,
        type: 'form',
        guidance,
    })
})

feedbackRouter.post('/machine', async (c) => {
    const payload = await c.req
        .json<{
            userId: string
            machine: string
            observed: string
            sessionId?: string
        }>()
        .catch(() => null)

    if (!payload?.userId || !payload.machine || !payload.observed) {
        return c.json({ ok: false, message: 'userId, machine, and observed are required.' }, 400)
    }

    await prisma.user.upsert({
        where: { id: payload.userId },
        update: {},
        create: {
            id: payload.userId,
            email: `${payload.userId}@gymgpt.local`,
            displayName: 'Gymgpt User',
        },
    })

    const messages = buildFormFeedbackPrompt({
        exercise: payload.machine,
        observed: payload.observed,
        machine: payload.machine,
    })

    let guidance = ''

    try {
        guidance = await askOllama(messages)
    } catch {
        guidance = buildFallbackGuidance(payload.machine, payload.observed)
    }

    await prisma.feedbackEvent.create({
        data: {
            userId: payload.userId,
            sessionId: payload.sessionId,
            feedbackType: 'MACHINE',
            verdict: guidance.includes('needs correction') ? 'needs correction' : 'good',
            guidance,
        },
    })

    return c.json({
        ok: true,
        type: 'machine',
        guidance,
    })
})
