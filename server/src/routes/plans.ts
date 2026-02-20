import { Hono } from 'hono'
import { askOllama } from '../lib/ollama'
import { prisma } from '../lib/prisma'
import { buildPlanPrompt } from '../prompts/plan-generation'

export const plansRouter = new Hono()

plansRouter.post('/generate', async (c) => {
    const payload = await c.req
        .json<{
            userId: string
            title: string
            goal: 'STRENGTH' | 'HYPERTROPHY' | 'ENDURANCE' | 'FAT_LOSS' | 'GENERAL_FITNESS'
            experience: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
            daysPerWeek: number
            weeks: number
            equipment: string
            notes?: string
        }>()
        .catch(() => null)

    if (!payload?.userId || !payload.title || !payload.goal || !payload.experience || !payload.daysPerWeek || !payload.weeks || !payload.equipment) {
        return c.json({ ok: false, message: 'Missing required plan generation fields.' }, 400)
    }

    const planMarkdown = await askOllama(
        buildPlanPrompt({
            goal: payload.goal,
            experience: payload.experience,
            daysPerWeek: payload.daysPerWeek,
            weeks: payload.weeks,
            equipment: payload.equipment,
            notes: payload.notes,
        }),
    )

    await prisma.user.upsert({
        where: { id: payload.userId },
        update: {},
        create: {
            id: payload.userId,
            email: `${payload.userId}@gymgpt.local`,
            displayName: 'Gymgpt User',
        },
    })

    const plan = await prisma.workoutPlan.create({
        data: {
            userId: payload.userId,
            title: payload.title,
            goalType: payload.goal,
            experienceLevel: payload.experience,
            weeks: payload.weeks,
        },
    })

    return c.json({
        ok: true,
        planId: plan.id,
        planMarkdown,
    })
})

plansRouter.post('/:id/revise', async (c) => {
    const payload = await c.req
        .json<{
            notes: string
            daysPerWeek?: number
            equipment?: string
        }>()
        .catch(() => null)

    if (!payload?.notes) {
        return c.json({ ok: false, message: 'Revision notes are required.' }, 400)
    }

    const plan = await prisma.workoutPlan.findUnique({
        where: { id: c.req.param('id') },
    })

    if (!plan) {
        return c.json({ ok: false, message: 'Plan not found.' }, 404)
    }

    const revisedPlan = await askOllama(
        buildPlanPrompt({
            goal: plan.goalType,
            experience: plan.experienceLevel,
            daysPerWeek: payload.daysPerWeek ?? 4,
            weeks: plan.weeks,
            equipment: payload.equipment ?? 'mixed gym equipment',
            notes: payload.notes,
        }),
    )

    return c.json({
        ok: true,
        planId: c.req.param('id'),
        revisedPlan,
    })
})
