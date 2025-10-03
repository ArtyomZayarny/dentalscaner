# Deployment Configuration

## Environment Variables for Production

### Backend (Server) - Vercel Environment Variables

Add these variables to your backend Vercel project:

```
FRONTEND_URL=https://dentalscaner-fe.vercel.app
STRIPE_SECRET_KEY=sk_test_51RwjR9DjdshnL5PMUR0qJgZOvMFyDFYidVGrK9ZtkMLEkbBALw5SILlGNP6dQ2EviEUElteSV1oCDHCqWaCFwgM900MG7ElCKK
DATABASE_HOST=ep-soft-lake-ad4sxtx7-pooler.c-2.us-east-1.aws.neon.tech
DATABASE_USER=neondb_owner
DATABASE_NAME=neondb
DATABASE_PASSWORD=npg_L6pejE0OkTxd
DATABASE_PORT=5432
```

### Frontend (Client) - Vercel Environment Variables

Add these variables to your frontend Vercel project:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RwjR9DjdshnL5PMQtiSySHEG1k1FhaE4VhQLjzPkyqbvzZ2ej5zd4aSRR7coVBlWl2OKISWQyVRGkXTiHMG4zXl009ZjrkHkA
NEXT_PUBLIC_GRAPHQL_URL=https://dentalscaner-three.vercel.app/graphql
NEXTAUTH_URL=https://dentalscaner-fe.vercel.app
NEXTAUTH_SECRET=paGwgSh+naTHrhknKTLflD1cTn65Tgwi1nWN2r8uk0g=
GOOGLE_CLIENT_ID=83542740981-kpq9eu18rfr29mn20br2mmmefr62vj0s.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project (backend or frontend)
3. Go to Settings → Environment Variables
4. Add each variable with its value
5. Redeploy the project

## Current Issue

The 500 error on production is caused by missing `FRONTEND_URL` environment variable on the backend, which is required for Stripe checkout session creation.
