import { env } from '../config/env'

type OllamaMessage = {
    role: 'system' | 'user' | 'assistant'
    content: string
}

type OllamaChatResponse = {
    message?: {
        content?: string
    }
}

export const askOllama = async (messages: OllamaMessage[]) => {
    const response = await fetch(`${env.ollamaBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: env.ollamaModel,
            messages,
            stream: false,
        }),
    })

    if (!response.ok) {
        const body = await response.text().catch(() => 'No body')
        throw new Error(`Ollama request failed (${response.status}): ${body}`)
    }

    const data = (await response.json()) as OllamaChatResponse
    const content = data.message?.content?.trim()

    if (!content) {
        throw new Error('Ollama returned an empty response')
    }

    return content
}
