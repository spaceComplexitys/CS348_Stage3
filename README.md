## Getting Started

First, run the development server:

```bash
npm i 

npm run dev
```

For changing the schema
```bash

rm -rf migration

npx drizzle-kit generate
npx drizzle-kit push
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
