import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface QuoteConfirmationEmailProps {
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

export const QuoteConfirmationEmail = ({
  name,
  submissionId,
  company,
  inputMethod,
  columnCount,
  columns,
}: QuoteConfirmationEmailProps) => {
  const previewText = `Quote request ${submissionId} confirmed - We'll respond within a couple of hours`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={heading}>SalesDuo</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {name},</Text>

            <Text style={paragraph}>
              Thank you for submitting your quote request. We have received your
              information and our team is reviewing your requirements.
            </Text>

            <Text style={paragraph}>
              <strong>Submission ID:</strong> {submissionId}
              <br />
              <strong>Company:</strong> {company}
              <br />
              <strong>Input Method:</strong> {inputMethod === 'video' ? 'Video' : 'Text Description'}
              <br />
              <strong>Columns Requested:</strong> {columnCount}
            </Text>

            <Text style={paragraph}>
              <strong>Your requested columns:</strong>
            </Text>

            {columns.map((col, idx) => (
              <Text key={idx} style={columnItem}>
                {idx + 1}. {col.name} ({col.dataType})
                {col.description && ` — ${col.description}`}
              </Text>
            ))}

            <Text style={paragraph}>
              Our team will analyze your requirements and research process. You'll
              receive a detailed quote via email within a couple of hours.
            </Text>

            <Text style={paragraph}>
              If you have any questions, simply reply to this email.
            </Text>

            <Text style={signOff}>
              Best regards,
              <br />
              The SalesDuo Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerMeta}>Reference: {submissionId}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default QuoteConfirmationEmail;

// Styles (inline for email client compatibility)
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  border: '1px solid #e0e0e0',
};

const header = {
  padding: '32px 40px 24px',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
};

const heading = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
  letterSpacing: '-0.3px',
};

const content = {
  padding: '32px 40px',
};

const greeting = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#1a1a1a',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#4a4a4a',
  margin: '0 0 20px',
};

const columnItem = {
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 6px',
  color: '#1a1a1a',
};

const signOff = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#1a1a1a',
  margin: '24px 0 0',
};

const divider = {
  borderColor: '#e0e0e0',
  margin: '0',
};

const footer = {
  padding: '20px 40px',
  backgroundColor: '#fafafa',
  borderTop: '1px solid #e0e0e0',
};

const footerMeta = {
  fontSize: '12px',
  color: '#999999',
  lineHeight: '18px',
  margin: '0',
};
