# Gymgpt Server

## Setup

Install dependencies:

```sh
bun install
```

Create your environment file:

```sh
cp .env.example .env
```

Generate Prisma client:

```sh
bun run prisma:generate
```

Create the initial SQLite migration:

```sh
bun run prisma:migrate --name init_gymgpt
```

## Run

```sh
bun run dev
```

Server base URL: http://localhost:3000

## Implemented routes

- `GET /health`
- `GET /health/ready`
- `POST /api/feedback/form`
- `POST /api/feedback/machine`
- `POST /api/plans/generate`
- `POST /api/plans/:id/revise`
- `POST /api/sessions/start`
- `POST /api/sessions/:id/log-set`
- `POST /api/sessions/:id/end`
- `GET /api/users/:id/progress`

## AI-backed endpoints

`POST /api/feedback/form` body:

```json
{
	"userId": "<user-id>",
	"exercise": "Barbell Squat",
	"observed": "Knees cave inward during ascent",
	"machine": "optional machine name",
	"sessionId": "optional session id"
}
```

`POST /api/plans/generate` body:

```json
{
	"userId": "<user-id>",
	"title": "8 Week Strength Block",
	"goal": "STRENGTH",
	"experience": "INTERMEDIATE",
	"daysPerWeek": 4,
	"weeks": 8,
	"equipment": "commercial gym",
	"notes": "focus on squat and bench"
}
```
