const required = ['OLLAMA_BASE_URL', 'OLLAMA_MODEL'] as const

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`)
    }
}

export const env = {
    port: Number(process.env.PORT ?? 3000),
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL as string,
    ollamaModel: process.env.OLLAMA_MODEL as string,
}
