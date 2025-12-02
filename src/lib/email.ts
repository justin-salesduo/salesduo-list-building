import { resend, validateResendConfig } from './resend';
import QuoteConfirmationEmail from '@/emails/quote-confirmation';

export interface SendQuoteConfirmationParams {
  to: string;
  name: string;
  submissionId: string;
  company: string;
  inputMethod: 'video' | 'text';
  columnCount: number;
  columns: Array<{
    name: string;
    dataType: string;
    description?: string;
  }>;
}

/**
 * Send quote confirmation email to the user
 * This is a best-effort operation - errors are logged but don't block the submission
 */
export async function sendQuoteConfirmationEmail(
  params: SendQuoteConfirmationParams
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  // Validate Resend configuration
  if (!validateResendConfig()) {
    console.warn('Resend not configured. Skipping confirmation email.');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { to, name, submissionId, company, inputMethod, columnCount, columns } = params;

    // Validate email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(to)) {
      throw new Error(`Invalid email address: ${to}`);
    }

    console.log(`📧 Sending confirmation email to ${to} for submission ${submissionId}...`);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [to],
      replyTo: process.env.RESEND_REPLY_TO_EMAIL || process.env.RESEND_FROM_EMAIL!,
      subject: `Quote Request Confirmed - ${submissionId}`,
      react: QuoteConfirmationEmail({
        name,
        submissionId,
        company,
        inputMethod,
        columnCount,
        columns,
      }),
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Confirmation email sent successfully. Email ID: ${data?.id}`);
    return { success: true, emailId: data?.id };
  } catch (error) {
    // Log error but don't throw - this is non-blocking
    console.error('❌ Failed to send confirmation email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

/**
 * Retry logic wrapper for sending emails
 * Implements exponential backoff for transient failures
 */
export async function sendQuoteConfirmationEmailWithRetry(
  params: SendQuoteConfirmationParams,
  maxRetries: number = 2
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  let lastResult: { success: boolean; emailId?: string; error?: string } | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    lastResult = await sendQuoteConfirmationEmail(params);

    if (lastResult.success) {
      return lastResult;
    }

    // Don't retry for configuration errors or invalid email
    if (
      lastResult.error?.includes('not configured') ||
      lastResult.error?.includes('Invalid email')
    ) {
      console.log('⏭️  Skipping retry for non-retryable error');
      return lastResult;
    }

    // If this wasn't the last attempt, wait before retrying
    if (attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s
      console.log(`🔄 Retrying email send in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return lastResult || { success: false, error: 'No attempts made' };
}
