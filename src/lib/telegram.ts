export interface TelegramMessageData {
  submissionId: string;
  name: string;
  email: string;
  company: string;
  videoUrl?: string;
  textPrompt?: string;
  inputMethod: 'video' | 'text';
  columnsFormatted: string;
  columnCount: number;
  notionUrl: string;
}

/**
 * Send a Telegram notification about a new quote request submission
 * This is a best-effort notification - errors are logged but don't block the submission
 */
export async function sendTelegramNotification(
  data: TelegramMessageData
): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const messageThreadId = process.env.TELEGRAM_MESSAGE_THREAD_ID;

  // Skip if Telegram is not configured
  if (!botToken || !chatId) {
    console.warn(
      'Telegram credentials not configured (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing). Skipping notification.'
    );
    return;
  }

  try {
    // Format timestamp in SGT
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Format input details based on method
    let inputDetails = '';
    if (data.inputMethod === 'video') {
      if (data.videoUrl) {
        inputDetails = `*Video URL:* ${data.videoUrl}`;
      } else {
        inputDetails = `*Video File:* Uploaded (check Notion for details)`;
      }
    } else {
      // Text method - truncate if too long
      const truncatedPrompt =
        data.textPrompt && data.textPrompt.length > 200
          ? data.textPrompt.substring(0, 200) + '...'
          : data.textPrompt || 'No description provided';
      inputDetails = `*Description:* ${truncatedPrompt}`;
    }

    // Build the formatted message
    const message = `
🎯 *NEW QUOTE REQUEST* #${data.submissionId}

👤 *Contact Information*
━━━━━━━━━━━━━━━━━━━━
*Name:* ${data.name}
*Email:* ${data.email}
*Company:* ${data.company}

📊 *Output Columns* (${data.columnCount})
━━━━━━━━━━━━━━━━━━━━
${data.columnsFormatted}

🎥 *Research Process*
━━━━━━━━━━━━━━━━━━━━
*Method:* ${data.inputMethod === 'video' ? 'Video' : 'Text'}
${inputDetails}

⏰ *Submitted:* ${timestamp} SGT

🔗 [View in Notion](${data.notionUrl})

━━━━━━━━━━━━━━━━━━━━
⚡ *Action Required:* Review and send quote within 2 hours
`;

    // Prepare request body
    const requestBody: {
      chat_id: string;
      text: string;
      parse_mode: string;
      disable_web_page_preview: boolean;
      message_thread_id?: number;
    } = {
      chat_id: chatId,
      text: message.trim(),
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
    };

    // Add message_thread_id if using community group with topics
    if (messageThreadId) {
      const threadId = parseInt(messageThreadId, 10);
      if (!isNaN(threadId)) {
        requestBody.message_thread_id = threadId;
        console.log(`Posting to thread ID: ${threadId}`);
      }
    }

    // Send the message to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Telegram API returned ${response.status}: ${JSON.stringify(errorData)}`
      );
    }

    console.log('Telegram notification sent successfully');
  } catch (error) {
    // Log the error but don't throw - this is non-blocking
    console.error('Failed to send Telegram notification:', error);
    console.error(
      'Quote submission was successful, but notification failed. Please check Notion database manually.'
    );
  }
}
