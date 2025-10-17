import * as jwt from 'jsonwebtoken';

export interface GoogleJwtPayload {
  iss: string; // Issuer
  aud: string; // Audience
  sub: string; // Subject (user ID)
  email: string; // User email
  email_verified: boolean; // Email verification status
  name: string; // Full name
  given_name: string; // First name
  family_name: string; // Last name
  picture: string; // Profile picture URL
  iat: number; // Issued at
  exp: number; // Expiration time
}

/**
 * Decodes Google JWT token without verification (for demo purposes)
 * In production, you should verify the token signature with Google's public keys
 */
export function decodeGoogleJwt(token: string): GoogleJwtPayload | null {
  try {
    // For demo purposes, we decode without verification
    // In production, you would verify the signature with Google's public keys
    const decoded = jwt.decode(token) as GoogleJwtPayload;

    if (!decoded || !decoded.email) {
      throw new Error('Invalid token: missing email');
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding Google JWT:', error);
    return null;
  }
}

/**
 * Extracts user information from Google JWT token
 */
export function extractGoogleUserInfo(token: string): {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  picture?: string;
} | null {
  const payload = decodeGoogleJwt(token);

  if (!payload) {
    return null;
  }

  return {
    email: payload.email,
    firstName: payload.given_name || payload.name?.split(' ')[0] || 'Google',
    lastName:
      payload.family_name ||
      payload.name?.split(' ').slice(1).join(' ') ||
      'User',
    name: payload.name || `${payload.given_name} ${payload.family_name}`.trim(),
    picture: payload.picture,
  };
}
