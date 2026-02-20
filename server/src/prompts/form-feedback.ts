type FormFeedbackInput = {
    exercise: string
    observed: string
    machine?: string
}

export const buildFormFeedbackPrompt = (input: FormFeedbackInput) => {
    const machineLine = input.machine ? `Machine: ${input.machine}` : 'Machine: none'

    return [
        {
            role: 'system' as const,
            content:
                'You are Gymgpt, a gym coaching assistant. Provide concise, practical coaching feedback. Do not diagnose medical conditions.',
        },
        {
            role: 'user' as const,
            content: `Exercise: ${input.exercise}\n${machineLine}\nObserved movement summary: ${input.observed}\n\nReturn:\n1) Verdict (good / needs correction)\n2) Top 2 corrections\n3) One encouragement line`,
        },
    ]
}
