import { Resend } from 'resend';
import 'dotenv/config';
export async function sendEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  if (!ownerEmail) {
    throw new Error('Missing CONTACT_EMAIL');
  }

  const resend = new Resend(apiKey);

  try {
    const emailResponse = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [ownerEmail],
      subject: `Portfolio Contact <${email}>`,
      html: `
        <p>Hi Rakesh,</p>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return emailResponse;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
}
