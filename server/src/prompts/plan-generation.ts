type PlanPromptInput = {
    goal: string
    experience: string
    daysPerWeek: number
    equipment: string
    notes?: string
}

export const buildPlanPrompt = (input: PlanPromptInput) => {
    return [
        {
            role: 'system' as const,
            content:
                'You are Gymgpt, a strength and fitness planning assistant. Build realistic plans with progression and recovery. No medical diagnosis.',
        },
        {
            role: 'user' as const,
            content: `Create a ${input.daysPerWeek}-day weekly workout plan.\nGoal: ${input.goal}\nExperience: ${input.experience}\nEquipment: ${input.equipment}\nNotes: ${input.notes ?? 'none'}\n\nReturn concise markdown with:\n- weekly split\n- exercises with sets/reps\n- progression guidance\n- deload recommendation`,
        },
    ]
}
