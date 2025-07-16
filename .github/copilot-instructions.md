<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WhatsApp POS System - tRPC Project

This project uses:

- **tRPC** for type-safe API endpoints
- **TypeScript** for type safety
- **Zod** for runtime validation
- **Next.js** with App Router
- **Prettier** for code formatting
- **ESLint** for code linting
- **Prisma** for database ORM
- **Shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Lucide React** for icons

## Code Style Guidelines

- Use TypeScript for all files
- Use Zod schemas for input validation
- Follow tRPC patterns for API endpoints
- Use proper error handling with custom tRPC error classes
- Keep components clean and focused
- Use meaningful variable and function names
- Use single quotes for strings in JSX
- Use Prettier for consistent formatting

## tRPC Patterns

- Define procedures in the `server/api/routers/` directory
- Use Zod schemas for input validation in `server/api/schemas/`
- Return typed responses from procedures
- Use proper error codes (BAD_REQUEST, UNAUTHORIZED, CONFLICT, etc.)
- Group related procedures in the same router
- Use custom error classes from `server/api/errors/`

## Error Handling

- Use custom error classes that extend TRPCError
- Available error types: AuthError, ValidationError, ConflictError,
  InternalError
- Use the `handleError` utility function for consistent error handling
- Handle errors at the tRPC router level

## Authentication

- signUp schema includes: name, email, password, confirmPassword, businessName,
  phone
- Password validation includes regex requirements
- Phone numbers must be 11 digits starting with 0 (Pakistani format)
- Email validation using Zod email schema

## File Structure

- `/src/server/api/` - tRPC server configuration
- `/src/server/api/routers/` - API route handlers
- `/src/server/api/schemas/` - Zod validation schemas
- `/src/server/api/models/` - Business logic models
- `/src/server/api/errors/` - Custom error classes
- `/src/server/api/trpc.ts` - tRPC context and middleware
- `/src/utils/api.ts` - tRPC client configuration
- `/src/components/ui/` - Shadcn/ui components
- `/src/app/` - Next.js app router pages

## UI Components

- Use Shadcn/ui components for consistent design
- Use Lucide React for icons
- Use Tailwind CSS for styling
- Form handling with React Hook Form + Zod resolver
- Use proper loading states and error handling in UI
