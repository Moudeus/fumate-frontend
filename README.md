# FU-Mate Web Frontend

React web application for FU-Mate career guidance platform.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API calls
- **Zustand** for state management (optional)

## Project Structure

```
src/
├── apis/              # API client modules
├── components/        # Reusable components
│   ├── common/       # Shared components
│   └── layout/       # Layout components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── layouts/           # Page layouts
├── pages/             # Page components
├── routes/            # Route configuration
├── services/          # Business logic
├── theme/             # Theme configuration
├── types/             # TypeScript types
├── utils/             # Utility functions
├── App.tsx            # Root component
└── main.tsx           # Entry point
```

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8080/api
```

## Features

- Authentication (Login/Register)
- Protected routes
- Theme support (Light/Dark)
- Responsive design
- TypeScript strict mode
- Path aliases for clean imports
