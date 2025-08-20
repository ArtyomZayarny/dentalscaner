import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different routes
  const { pathname } = new URL(req.url || '/', `http://${req.headers.host}`);

  try {
    switch (pathname) {
      case '/':
        res.status(200).json({
          message: 'Server is live! 🚀',
          status: 'running',
          timestamp: new Date().toISOString(),
          service: 'dental-scaner-backend',
          version: '1.0.0',
        });
        break;

      case '/health':
        res.status(200).json({
          status: 'ok',
          timestamp: new Date().toISOString(),
          service: 'dental-scaner-backend',
          version: '1.0.0',
        });
        break;

      case '/status':
        res.status(200).json({
          message: 'Server is live! 🚀',
          status: 'running',
          timestamp: new Date().toISOString(),
          service: 'dental-scaner-backend',
          version: '1.0.0',
          endpoints: {
            health: '/health',
            graphql: '/graphql',
            status: '/status',
          },
        });
        break;

      default:
        res.status(404).json({
          error: 'Not Found',
          message: 'Endpoint not found',
          availableEndpoints: ['/', '/health', '/status'],
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
}
