# Gymgpt Implementation Plan

## Vision
Gymgpt is a gym and workout assistant that:
- Uses device camera/sensor data to evaluate exercise form and machine usage.
- Talks to users in a chat-style interface powered by `ollama gpt-oss:120b-cloud`.
- Speaks feedback aloud using text-to-speech.
- Creates personalized workout plans and adapts them over time.
- Stores user progress and coaching history with Prisma + SQLite.

---

## Product Goals
1. Real-time coaching for exercise form and machine setup.
2. Conversational assistant behavior like ChatGPT, but specialized for gym tasks.
3. Personalized workout plan generation and progression.
4. Voice-first support: Gymgpt can speak cues, corrections, and encouragement.
5. Persistent history so plans and advice improve as users train.

---

## Architecture Overview

### Client (Expo/React Native)
- Live Coaching screen:
  - Captures camera and motion input.
  - Shows real-time feedback overlays and chat transcript.
  - Plays spoken cues and coaching prompts.
- Plan Builder screen:
  - Collects goals, schedule, equipment, injuries/preferences.
  - Displays generated training blocks and daily workouts.
- History & Progress screen:
  - Session logs, improvements, recurring form issues.

### Server (Hono + Bun)
- API routes for:
  - Auth/user profile.
  - Form/machine feedback requests.
  - Workout plan generation.
  - Session and rep logging.
- Prompt orchestration for `ollama gpt-oss:120b-cloud`:
  - Form-check prompts.
  - Machine-technique prompts.
  - Plan-creation and plan-adjustment prompts.
- Streaming response support for near real-time chat/coach output.

### Data Layer (Prisma + SQLite)
- Core models:
  - `User`
  - `Exercise`
  - `MachineProfile`
  - `WorkoutPlan`
  - `WorkoutDay`
  - `Session`
  - `SetLog`
  - `FeedbackEvent`
- Store:
  - User goals and constraints.
  - Plan versions and revisions.
  - Feedback confidence and corrective suggestions.

---

## AI + Coaching Flow
1. Client captures movement and machine metadata.
2. Client sends normalized features to server (angles, tempo, ROM, setup details).
3. Server enriches with context (user history, target exercise standards).
4. Server prompts `ollama gpt-oss:120b-cloud` for verdict + guidance.
5. Client receives response as:
   - Text in chat transcript.
   - Spoken coaching via TTS.
6. Feedback event is stored for trend analysis and future plan adaptation.

---

## Voice Experience Plan
- Enable spoken responses for all assistant messages.
- Add settings for:
  - Voice on/off
  - Speaking rate
  - Volume
  - Coaching style (calm, energetic, strict)
- Real-time voice cues for key events:
  - "Good rep"
  - "Slow down"
  - "Adjust seat height"
  - "Maintain neutral spine"
- Keep text transcript synchronized with spoken output.
- Include pause/resume/stop controls for accessibility and gym noise conditions.

---

## Workout Plan Generation Scope
Gymgpt generates plans based on:
- Primary goal (strength, hypertrophy, endurance, fat loss, general fitness).
- Experience level.
- Weekly availability.
- Equipment access (home, commercial gym, machine-only, free-weights-only).
- Physical limitations/injury notes.

Plan output should include:
- Program duration (e.g., 4/8/12 weeks).
- Weekly split.
- Exercise selection with alternatives.
- Sets, reps, intensity/RPE/rest guidance.
- Progression logic and deload recommendations.

---

## Initial API Surface (Server)
- `POST /api/feedback/form`
- `POST /api/feedback/machine`
- `POST /api/plans/generate`
- `POST /api/plans/:id/revise`
- `POST /api/sessions/start`
- `POST /api/sessions/:id/log-set`
- `POST /api/sessions/:id/end`
- `GET /api/users/:id/progress`

---

## Milestone Plan

### Milestone 1: Backend Foundation
- Add Prisma setup and SQLite datasource.
- Create initial schema and migration.
- Implement Hono route scaffolding and health checks.

### Milestone 2: AI Integration
- Build ollama client wrapper.
- Add prompt templates for form checks and plan generation.
- Add response streaming and error handling.

### Milestone 3: Client Core UX
- Build chat interface and API integration.
- Add live coaching screen and feedback rendering.
- Add TTS playback queue and user controls.

### Milestone 4: Plans + Progress
- Build plan generation UI and storage.
- Add session logging and analytics views.
- Implement adaptive plan revisions from performance history.

### Milestone 5: Safety + Quality
- Add guardrails/disclaimers for medical concerns.
- Add confidence tagging and fallback messaging.
- Test feedback consistency across common lifts/machines.

---

## Safety and Reliability Requirements
- Do not provide medical diagnosis.
- Show caution prompts for pain/injury indicators.
- Require confidence thresholds before strong corrective instructions.
- Persist all AI decisions for audit and iteration.

---

## Name and Positioning
- Product name: **Gymgpt**
- Positioning: “Your AI gym coach that sees, speaks, and adapts your training plan in real time.”
