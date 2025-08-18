# Deployment Guide

## Vercel Frontend Deployment

This project uses a monorepo structure with the frontend in the `client/` directory.

### Vercel Configuration

The `vercel.json` file in the root directory tells Vercel to deploy from the `client/` folder:

```json
{
  "rootDirectory": "client"
}
```

### Environment Variables

Make sure to set these environment variables in your Vercel dashboard:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the variables from `client/.env`

### Build Settings

Vercel will automatically:

- Install dependencies from `client/package.json`
- Run `npm run build` from the `client/` directory
- Deploy the Next.js application

### Backend Deployment

The backend (`server/` directory) should be deployed separately to a platform like:

- Railway
- Heroku
- DigitalOcean App Platform
- AWS/GCP/Azure

## Local Development

```bash
# Frontend
cd client && npm run dev

# Backend
cd server && npm run start:dev
```
