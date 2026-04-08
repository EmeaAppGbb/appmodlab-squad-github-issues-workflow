# DevConnect - Developer Q&A Forum

A TypeScript monorepo with Next.js frontend and tRPC backend for a developer Q&A forum.

## Tech Stack

- TypeScript monorepo (Turborepo)
- Next.js 14 frontend with App Router
- tRPC backend
- Prisma ORM with PostgreSQL
- Tailwind CSS
- Jest for testing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up database:
   ```bash
   cd packages/api
   npx prisma migrate dev
   ```

3. Run development servers:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 for the frontend
   API runs on http://localhost:3001

## Project Structure

- `packages/web` - Next.js frontend
- `packages/api` - tRPC backend
- `packages/shared` - Shared types and utilities
- `.github` - GitHub Actions and issue templates
