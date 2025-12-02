# SalesDuo List Building - Quote Request System

A Next.js application for collecting and managing custom list building quote requests with automated notifications and email confirmations.

## Features

- **Interactive Quote Request Form** - Multi-step form with video/text input options
- **Column Builder** - Define custom output columns with templates (Basic, Standard, Advanced)
- **Notion Integration** - Automatic database entry creation for quote tracking
- **Telegram Notifications** - Instant team notifications for new requests
- **Email Confirmations** - Professional automated confirmation emails via Resend
- **Credit-Based Pricing** - Interactive pricing calculator with flexible bundles

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form with Zod validation
- **Integrations**:
  - Notion API (database management)
  - Telegram Bot API (team notifications)
  - Resend (email delivery with React Email)

## Prerequisites

- Node.js 18+ and npm
- Notion account with integration access
- Telegram bot (via @BotFather)
- Resend account with verified domain

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure the following variables in `.env.local`:

```env
# Notion
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
TELEGRAM_MESSAGE_THREAD_ID=  # Optional for community groups

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=SalesDuo Team <noreply@yourdomain.com>
RESEND_REPLY_TO_EMAIL=support@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Integrations

Follow the detailed setup guides:

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete integration setup for Notion, Telegram, and Resend
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - Comprehensive testing scenarios

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit-quote/
│   │       └── route.ts          # Form submission API endpoint
│   ├── upload/
│   │   └── page.tsx              # Quote request form page
│   └── page.tsx                  # Landing page with pricing
├── components/
│   ├── column-builder.tsx        # Column definition interface
│   ├── upload-form.tsx           # Main quote request form
│   └── sections/
│       └── pricing.tsx           # Interactive pricing calculator
├── emails/
│   └── quote-confirmation.tsx    # Email template (React Email)
└── lib/
    ├── notion.ts                 # Notion API integration
    ├── telegram.ts               # Telegram Bot API
    ├── email.ts                  # Email service with retry logic
    └── resend.ts                 # Resend client configuration
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Create production build
npm run start           # Start production server

# Testing
node test-integration.js       # Test Notion + Telegram integration
node test-email-integration.js # Test complete workflow with email
```

## Form Workflow

1. **User fills quote request form**
   - Contact information (name, email, company)
   - Research method (video URL or text description)
   - Output column definitions

2. **Backend processing** (`/api/submit-quote`)
   - Validates form data
   - Generates unique submission ID
   - Creates Notion database entry
   - Sends email confirmation to user
   - Sends Telegram notification to team

3. **Team receives notification**
   - Telegram message with submission details
   - Link to Notion entry for review
   - User receives email confirmation

## Email Confirmation Design

- Clean, professional corporate design
- Grayscale color scheme with subtle brand accent
- Includes all submission details and requested columns
- Mobile-responsive layout
- Configurable sender name and reply-to address

## Column Templates

Pre-configured templates for common use cases:

- **Basic** - Name, Job Title, LinkedIn, Email, Company info
- **Standard** - Basic + Phone, Company Size, Industry, Location, Tech Stack
- **Advanced** - Standard + Department, Funding, Recent Activity, Intent Signals

## Pricing Tiers

- **1K credits** - $300 (1 month validity)
- **5K credits** - $1,000 (2 months validity)
- **10K credits** - $1,500 (3 months validity)
- **25K credits** - $3,000 (6 months validity) - Most Popular
- **50K+ credits** - Up to $15,000 (9-12 months validity)

Credits per lead: 1-5+ depending on data complexity

## Error Handling

- **Form validation** - Client-side with React Hook Form
- **API validation** - Server-side input sanitization
- **Integration errors** - Retry logic with exponential backoff
- **Non-blocking operations** - Email/Telegram failures don't block form submission
- **Comprehensive logging** - Detailed console logs for debugging

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

### Environment Variables for Production

Ensure all required variables are set in your deployment platform:
- Notion credentials
- Telegram bot configuration
- Resend API key and verified sending domain
- `NEXT_PUBLIC_APP_URL` set to production URL

## Testing

Run the integration test suite:

```bash
# Test Notion + Telegram
node test-integration.js

# Test complete workflow with email
node test-email-integration.js
```

Follow the [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing.

## Troubleshooting

### Notion Errors
- Check `NOTION_API_KEY` is valid
- Verify database is shared with integration
- Ensure database properties match exactly (case-sensitive)

### Telegram Errors
- Verify `TELEGRAM_BOT_TOKEN` is correct
- Check bot is added to group as admin
- Confirm `TELEGRAM_CHAT_ID` is correct (negative for groups)

### Email Errors
- Verify `RESEND_API_KEY` is valid
- Check sending domain is verified in Resend
- Ensure `RESEND_FROM_EMAIL` uses verified domain

### Build Errors
- Run `npm run build` to check for TypeScript errors
- Verify all environment variables are set
- Check Node.js version is 18+

## Support

For issues or questions:
- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions
- Review [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for testing scenarios
- Create an issue in the repository

## License

Proprietary - SalesDuo

---

Built with ❤️ by the SalesDuo Team
