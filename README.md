# Gymgpt - AI Gym Coach

A real-time AI-powered gym coaching assistant that uses computer vision and voice guidance to evaluate exercise form, provide instant corrections, and generate personalized workout plans.

## 🎯 Features

- **Live Coaching**: Real-time form analysis and form corrections with computer vision
- **Voice Guidance**: AI-powered voice cues and feedback synchronized with chat transcripts
- **Workout Plans**: Generate personalized training plans based on goals, equipment, and experience level
- **Form Analysis**: Machine learning-powered exercise form evaluation
- **Chat Interface**: Conversational assistance similar to ChatGPT but specialized for gym coaching
- **Progress Tracking**: Session history and performance metrics
- **Adaptive Learning**: Plans and coaching improve based on your training data over time

## 📱 Tech Stack

### Client (Expo/React Native)
- **Framework**: Expo with React Native and TypeScript
- **Navigation**: Expo Router
- **State Management**: React Hooks
- **Voice**: Expo Speech (text-to-speech)
- **Icons**: Expo Vector Icons (Ionicons)

### Server (Hono + Bun)
- **Runtime**: Bun
- **Framework**: Hono (lightweight HTTP server)
- **Database**: SQLite with Prisma ORM
- **AI Model**: Ollama GPT-OSS (120B Cloud)
- **Type Safety**: TypeScript

### Database
- **ORM**: Prisma
- **Database**: SQLite
- **Migrations**: Prisma Migrate

## 🚀 Getting Started

### Prerequisites
- Node.js/Bun
- Expo CLI
- Ollama (for local AI model)
- iOS/Android device or emulator

### Installation

#### Client Setup
```bash
cd client
npm install
npm start
```

Then choose your platform:
- iOS: `i`
- Android: `a`
- Web: `w`

#### Server Setup
```bash
cd server
bun install
bun run dev
```

#### Database Setup
```bash
cd server
bun run prisma:generate
bun run prisma:migrate
```

View database in Prisma Studio:
```bash
bun run prisma:studio
```

## 📂 Project Structure

```
workout_app/
├── client/                 # React Native/Expo mobile app
│   ├── app/               # Screen components
│   │   ├── _layout.tsx    # Root layout
│   │   ├── home.tsx       # Home screen
│   │   ├── coaching.tsx   # Live coaching screen
│   │   └── voice-modal.tsx # Voice settings modal
│   ├── components/        # Reusable components
│   │   ├── ChatPanel.tsx  # Chat interface
│   │   └── CoachingHeader.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useChatMessages.ts
│   │   └── useVoice.ts
│   ├── services/          # API and service layer
│   │   ├── api.ts         # HTTP client
│   │   └── voice.ts       # Voice service
│   └── assets/            # Images and media
├── server/                # Hono server
│   ├── src/
│   │   ├── index.ts       # Server entry
│   │   ├── config/        # Configuration
│   │   │   └── env.ts     # Environment variables
│   │   ├── lib/           # Utilities
│   │   │   ├── ollama.ts  # Ollama AI integration
│   │   │   └── prisma.ts  # Database client
│   │   ├── prompts/       # AI prompts
│   │   │   ├── form-feedback.ts
│   │   │   └── plan-generation.ts
│   │   └── routes/        # API endpoints
│   │       ├── users.ts
│   │       ├── plans.ts
│   │       ├── sessions.ts
│   │       ├── feedback.ts
│   │       └── health.ts
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── migrations/    # Migration files
│   └── package.json
└── plan.md                # Implementation roadmap
```

## 🔌 API Endpoints

### Users
- `GET /users/:id` - Get user profile
- `POST /users` - Create user
- `PUT /users/:id` - Update user

### Plans
- `GET /plans/:userId` - Get user's workout plans
- `POST /plans` - Generate new plan
- `PUT /plans/:id` - Update plan

### Sessions
- `GET /sessions/:userId` - Get user's sessions
- `POST /sessions` - Log new session
- `PUT /sessions/:id` - Update session

### Feedback
- `POST /feedback` - Submit form feedback
- `GET /feedback/:sessionId` - Get session feedback

### Health
- `GET /health` - Server health check

## 🧠 AI Integration

Gymgpt uses Ollama GPT-OSS (120B Cloud) for:
- Form analysis and corrections
- Workout plan generation
- Personalized coaching feedback
- Conversational responses

### Prompt Templates
- **Form Feedback**: Analyzes exercise form and provides corrections
- **Plan Generation**: Creates personalized workout plans
- **Session Feedback**: Provides coaching summaries

## 📊 Database Schema

Key models:
- **User**: User profiles and preferences
- **WorkoutPlan**: Training programs with structure
- **WorkoutDay**: Individual workout days within plans
- **Session**: Completed workout sessions
- **SetLog**: Individual sets and reps performed
- **FeedbackEvent**: Coaching feedback and form corrections
- **Exercise**: Exercise database and standards
- **MachineProfile**: Machine-specific setup guides

## 🎤 Voice Features

- Text-to-speech for all coaching messages
- Configurable voice settings (speed, volume, style)
- Real-time voice cues during workouts
- Synchronized text and voice transcripts
- Pause/resume/stop controls

## 🛠️ Available Scripts

### Client
```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

### Server
```bash
bun run dev                # Start development server (hot reload)
bun run prisma:generate    # Generate Prisma client
bun run prisma:migrate     # Run database migrations
bun run prisma:studio      # Open Prisma Studio
```

## 🔐 Environment Variables

### Server
Create `.env` file in server directory:
```
DATABASE_URL=file:./dev.db
OLLAMA_API_URL=http://localhost:11434
NODE_ENV=development
```

## 📝 Development Workflow

1. Start the server in development mode
2. Run Prisma migrations if schema changes
3. Start the Expo development server
4. Connect mobile device or emulator
5. Build new features on branches
6. Test form analysis with sample videos
7. Verify voice guidance and TTS

## 🤝 Contributing

1. Create a feature branch
2. Make changes in isolated components
3. Test on device
4. Submit pull request with description

## 📄 License

[Add your license here]

## 🙋 Support

For issues or questions, refer to [plan.md](plan.md) for the full implementation roadmap and project vision.
