import { NextRequest, NextResponse } from 'next/server';
import { createNotionEntry } from '@/lib/notion';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendQuoteConfirmationEmailWithRetry } from '@/lib/email';

// Type definitions for form data
interface ColumnDefinition {
  id: string;
  name: string;
  dataType: string;
  description?: string;
}

/**
 * POST /api/submit-quote
 *
 * Handles quote request form submissions:
 * 1. Validates form data
 * 2. Creates entry in Notion database
 * 3. Sends confirmation email to user
 * 4. Sends Telegram notification
 * 5. Returns success response
 */
export async function POST(req: NextRequest) {
  try {
    // Step 1: Parse form data
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const videoUrl = (formData.get('videoUrl') as string) || '';
    const textPrompt = (formData.get('textPrompt') as string) || '';
    const inputMethod = formData.get('inputMethod') as 'video' | 'text';
    const columnsJson = formData.get('columns') as string;

    // Step 2: Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, or company',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Parse and validate columns
    let columns: ColumnDefinition[];
    try {
      columns = JSON.parse(columnsJson);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid columns data format',
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one output column is required',
        },
        { status: 400 }
      );
    }

    // Validate all columns have names
    if (columns.some((col) => !col.name || !col.name.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: 'All columns must have names',
        },
        { status: 400 }
      );
    }

    // Validate input method requirements
    if (inputMethod === 'video' && !videoUrl.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Video URL is required when using video input method',
        },
        { status: 400 }
      );
    }

    if (inputMethod === 'text' && !textPrompt.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Text description is required when using text input method',
        },
        { status: 400 }
      );
    }

    // Step 3: Generate unique submission ID
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-6);
    const submissionId = `SUB-${year}${month}${day}-${timestamp}`;

    // Step 4: Format columns for Notion
    const columnsFormatted = columns
      .map((col, idx) => {
        const desc = col.description ? ` - ${col.description}` : '';
        return `${idx + 1}. ${col.name} (${col.dataType})${desc}`;
      })
      .join('\n');

    // Step 5: Create Notion entry
    console.log(`Creating Notion entry for submission ${submissionId}...`);

    const notionResponse = await createNotionEntry({
      submissionId,
      name,
      email,
      company,
      videoUrl: videoUrl || undefined,
      textPrompt: textPrompt || undefined,
      inputMethod,
      columns: columnsFormatted,
      columnCount: columns.length,
    });

    console.log(`Notion entry created successfully: ${notionResponse.url}`);

    // Step 6: Send confirmation email to user (best-effort, non-blocking)
    console.log('Sending confirmation email to user...');

    const emailResult = await sendQuoteConfirmationEmailWithRetry({
      to: email,
      name,
      submissionId,
      company,
      inputMethod,
      columnCount: columns.length,
      columns: columns.map((col) => ({
        name: col.name,
        dataType: col.dataType,
        description: col.description,
      })),
    });

    if (emailResult.success) {
      console.log(`✅ Confirmation email sent successfully: ${emailResult.emailId}`);
    } else {
      console.warn(`⚠️  Failed to send confirmation email: ${emailResult.error}`);
    }

    // Step 7: Send Telegram notification (best-effort, non-blocking)
    console.log('Sending Telegram notification...');

    await sendTelegramNotification({
      submissionId,
      name,
      email,
      company,
      videoUrl: videoUrl || undefined,
      textPrompt: textPrompt || undefined,
      inputMethod,
      columnsFormatted,
      columnCount: columns.length,
      notionUrl: notionResponse.url,
    });

    // Step 8: Return success response
    return NextResponse.json({
      success: true,
      submissionId,
      notionUrl: notionResponse.url,
      message: 'Quote request submitted successfully',
    });
  } catch (error) {
    // Log detailed error for debugging
    console.error('Error processing quote request:', error);

    // Return user-friendly error message
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit quote request. Please try again or contact support.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Use POST to submit a quote request.',
    },
    { status: 405 }
  );
}
