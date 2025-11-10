# gruntsiteapi

A lightweight Express + TypeScript API starter.

## Features
- Express 4 + TypeScript strict config
- Environment validation with Zod
- Security middleware: helmet, cors
- Logging: morgan (dev only)
- Centralized error & 404 handling
- ESLint (flat config) + Prettier + lint-staged + Husky hook ready

## Scripts
- `npm run dev` – Start dev server with auto-reload
- `npm run build` – Type-check & emit JS to `dist/`
- `npm start` – Run compiled server
- `npm run lint` – Lint all TS files
- `npm run check-types` – Type-check without emitting

## Environment
Copy `.env.example` to `.env` and adjust as needed.

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port the HTTP server listens on | 4000 |
| CORS_ORIGIN | Comma-separated list of allowed origins or * | * |
| NODE_ENV | Node environment | development |

## Project Structure
```
src/
  server.ts        # Entry point creating HTTP server
  app.ts           # Express app configuration
  config/env.ts    # Environment schema + parsing
  middleware/      # Error handlers
  routes/          # Route modules (health, index)
```

## Adding Routes
Create a new file in `src/routes`, export a router, then mount it in `routes/index.ts` or `app.ts`.

## Run
```bash
npm install
npm run dev
```
Then open: http://localhost:4000/ and http://localhost:4000/health

## License
MIT
