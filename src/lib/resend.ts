import { Resend } from 'resend';

// Initialize Resend client with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Validate that Resend is properly configured
 * @returns true if all required environment variables are set
 */
export function validateResendConfig(): boolean {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY environment variable is not set');
    return false;
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn('⚠️  RESEND_FROM_EMAIL environment variable is not set');
    return false;
  }

  return true;
}

export { resend };
