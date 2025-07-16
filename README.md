# WhatsApp POS System

A modern Point of Sale (POS) system built with **tRPC**, **TypeScript**,
**Next.js**, **Zod**, **Prettier**, and **ESLint**.

## Features

- 🔒 **Type-safe API** with tRPC
- 📝 **Runtime validation** with Zod
- ⚡ **Server-side rendering** with Next.js 15
- 🎨 **Beautiful UI** with Tailwind CSS
- 🔧 **Development tools** with ESLint and Prettier
- 📱 **Responsive design** for all devices

## Tech Stack

- **tRPC** - Type-safe APIs
- **TypeScript** - Static type checking
- **Next.js 15** - React framework with App Router
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **React Query** - Server state management
- **Prettier** - Code formatting (Google style)
- **ESLint** - Code linting with Google JavaScript Style Guide

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:** Navigate to
   [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier (Google style)
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/trpc/[trpc]/   # tRPC API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── items-manager.tsx  # Main POS interface
│   └── providers/         # Context providers
├── server/               # Server-side code
│   └── api/             # tRPC configuration
│       ├── routers/     # API route handlers
│       ├── root.ts      # Main router
│       └── trpc.ts      # tRPC setup
└── utils/               # Utility functions
    └── api.ts           # tRPC client
```

## Configuration Files

### Code Quality & Formatting

- **`.prettierrc.json`** - Prettier configuration (Google style)
- **`eslint.config.mjs`** - ESLint configuration with Google JavaScript Style
  Guide
- **`.vscode/settings.json`** - VS Code workspace settings

### Google Style Changes Applied

```json
// .prettierrc.json - Key Google style settings
{
  "singleQuote": true, // Use single quotes
  "jsxSingleQuote": true, // Single quotes in JSX
  "bracketSpacing": true, // { spacing } in objects
  "arrowParens": "always", // (param) => instead of param =>
  "trailingComma": "all" // Trailing commas everywhere
}
```

## API Routes

### Items Router (`/api/trpc/items`)

- **`getAll`** - Get all items
- **`getById`** - Get item by ID
- **`create`** - Create new item
- **`update`** - Update existing item
- **`delete`** - Delete item

All routes include **Zod validation** for type safety and runtime checks.

## Development

### Adding New API Routes

1. Create a new router in `src/server/api/routers/`
2. Add Zod schemas for validation
3. Export the router in `src/server/api/root.ts`

### Code Quality

This project follows **Google's JavaScript Style Guide** with React/Next.js
adaptations:

- **ESLint** ensures code quality and consistency
- **Prettier** maintains uniform formatting with Google style
- **TypeScript** provides compile-time type checking
- **Zod** provides runtime validation

## Contributing

### Code Style Guidelines

1. **Follow Google JavaScript Style Guide** - Enforced by ESLint
2. **Use single quotes** - Both in JavaScript/TypeScript and JSX
3. **Format before committing** - Run `npm run format`
4. **Lint your code** - Run `npm run lint`
5. **TypeScript types** - Ensure all types are properly defined

### Development Workflow

1. Make your changes following the existing patterns
2. Run `npm run format` to auto-format your code
3. Run `npm run lint` to check for any issues
4. Test your changes locally with `npm run dev`

## Learn More

- [tRPC Documentation](https://trpc.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
