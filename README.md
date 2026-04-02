# Enable G - Personality Assessment

This project contains the local source for the Enable G personality assessment app.

## Getting started

1. Install dependencies with `npm install`
2. Create an `.env.local` file with the required Base44 environment variables:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app.base44.app
VITE_BASE44_FUNCTIONS_VERSION=prod
```

3. Start the app with `npm run dev`

## Scripts

- `npm run dev` starts the local Vite server
- `npm run build` creates a production build
- `npm run preview` previews the built app
- `npm run lint` runs ESLint
- `npm run typecheck` runs TypeScript path checking
