<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WhatsApp POS System - tRPC Project

This project uses:

- **tRPC** for type-safe API endpoints
- **TypeScript** for type safety
- **Zod** for runtime validation
- **Next.js** with App Router
- **Prettier** for code formatting
- **ESLint** for code linting

## Code Style Guidelines

- Use TypeScript for all files
- Use Zod schemas for input validation
- Follow tRPC patterns for API endpoints
- Use proper error handling with tRPC errors
- Keep components clean and focused
- Use meaningful variable and function names

## tRPC Patterns

- Define procedures in the `server/api/routers/` directory
- Use Zod schemas for input validation
- Return typed responses from procedures
- Use proper error codes (BAD_REQUEST, UNAUTHORIZED, etc.)
- Group related procedures in the same router

## File Structure

- `/src/server/api/` - tRPC server configuration
- `/src/server/api/routers/` - API route handlers
- `/src/server/api/trpc.ts` - tRPC context and middleware
- `/src/utils/api.ts` - tRPC client configuration
