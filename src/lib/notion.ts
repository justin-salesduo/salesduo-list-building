import { Client } from '@notionhq/client';

// Initialize Notion client with API version that includes properties
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28', // Required to get database properties
});

export interface NotionEntryData {
  submissionId: string;
  name: string;
  email: string;
  company: string;
  videoUrl?: string;
  textPrompt?: string;
  inputMethod: 'video' | 'text';
  columns: string; // Formatted string of columns
  columnCount: number;
}

export interface NotionResponse {
  id: string;
  url: string;
}

/**
 * Create a new entry in the Notion database for a quote request submission
 */
export async function createNotionEntry(
  data: NotionEntryData
): Promise<NotionResponse> {
  if (!process.env.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY environment variable is not set');
  }

  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID environment variable is not set');
  }

  // Retry logic with exponential backoff
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID,
        },
        properties: {
          // Title field - Submission ID
          'Submission ID': {
            title: [
              {
                text: {
                  content: data.submissionId,
                },
              },
            ],
          },

          // Contact Information
          Name: {
            rich_text: [
              {
                text: {
                  content: data.name,
                },
              },
            ],
          },

          Email: {
            email: data.email,
          },

          'Company Website': {
            url: data.company,
          },

          // Input Method
          'Input Method': {
            select: {
              name: data.inputMethod === 'video' ? 'Video' : 'Text',
            },
          },

          // Video URL (optional)
          ...(data.videoUrl && {
            'Video URL': {
              url: data.videoUrl,
            },
          }),

          // Text Prompt (optional)
          ...(data.textPrompt && {
            'Text Prompt': {
              rich_text: [
                {
                  text: {
                    content: data.textPrompt,
                  },
                },
              ],
            },
          }),

          // Output Columns
          'Output Columns': {
            rich_text: [
              {
                text: {
                  content: data.columns,
                },
              },
            ],
          },

          'Column Count': {
            number: data.columnCount,
          },

          // Default Status
          Status: {
            status: {
              name: 'New',
            },
          },

          // Default Quote Sent
          'Quote Sent': {
            checkbox: false,
          },
        },
      });

      // Success - return the page ID and URL
      // Construct URL from page ID since response type doesn't include url property
      const pageUrl = `https://www.notion.so/${response.id.replace(/-/g, '')}`;
      return {
        id: response.id,
        url: pageUrl,
      };
    } catch (error) {
      lastError = error as Error;
      console.error(`Notion API attempt ${attempt}/${maxRetries} failed:`, error);

      // If this wasn't the last attempt, wait before retrying
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // All retries failed
  console.error('All Notion API retry attempts failed');
  throw new Error(
    `Failed to create Notion entry after ${maxRetries} attempts: ${lastError?.message}`
  );
}

/**
 * Update an existing Notion page (for future use)
 */
export async function updateNotionEntry(
  pageId: string,
  properties: Record<string, any>
): Promise<void> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties,
    });
  } catch (error) {
    console.error('Failed to update Notion entry:', error);
    throw new Error('Failed to update Notion entry');
  }
}
