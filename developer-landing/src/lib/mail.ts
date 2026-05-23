import type { ContactFormValues } from '@/types/contact';

const RESEND_API_URL = 'https://api.resend.com/emails';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string[];
};

async function sendResendEmail(payload: ResendEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

function createOwnerEmail(values: ContactFormValues) {
  const safeName = escapeHtml(values.name);
  const safePhone = escapeHtml(values.phone);
  const safeEmail = escapeHtml(values.email);
  const safeComment = escapeHtml(values.comment).replaceAll('\n', '<br />');

  return {
    subject: `Новая заявка с лендинга — ${values.name}`,
    text: [
      'Новая заявка с лендинга',
      '',
      `Имя: ${values.name}`,
      `Телефон: ${values.phone}`,
      `Email: ${values.email}`,
      '',
      'Комментарий:',
      values.comment,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">Новая заявка с лендинга</h2>
        <p><strong>Имя:</strong> ${safeName}</p>
        <p><strong>Телефон:</strong> ${safePhone}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Комментарий:</strong></p>
        <div style="padding: 16px; border-radius: 12px; background: #f3f4f6;">${safeComment}</div>
      </div>
    `,
  };
}

function createUserCopyEmail(values: ContactFormValues) {
  const safeName = escapeHtml(values.name);
  const safeComment = escapeHtml(values.comment).replaceAll('\n', '<br />');

  return {
    subject: 'Копия вашей заявки — Владислав Андрест',
    text: [
      `${values.name}, спасибо за сообщение!`,
      '',
      'Я получил вашу заявку и отвечу вам в ближайшее время.',
      '',
      'Ваш комментарий:',
      values.comment,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
        <h2 style="margin: 0 0 16px;">${safeName}, спасибо за сообщение!</h2>
        <p>Я получил вашу заявку и отвечу вам в ближайшее время.</p>
        <p><strong>Ваш комментарий:</strong></p>
        <div style="padding: 16px; border-radius: 12px; background: #f3f4f6;">${safeComment}</div>
      </div>
    `,
  };
}

export async function sendContactEmails(values: ContactFormValues) {
  const isMockMode = process.env.CONTACT_MOCK_EMAIL === 'true';
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL || 'andrestvlad@gmail.com';
  const fromEmail = process.env.MAIL_FROM || 'Developer Landing <onboarding@resend.dev>';

  if (isMockMode) {
    console.info('[contact-form:mock]', values);
    return;
  }

  const ownerEmailContent = createOwnerEmail(values);
  const userEmailContent = createUserCopyEmail(values);

  await Promise.all([
    sendResendEmail({
      from: fromEmail,
      to: [ownerEmail],
      subject: ownerEmailContent.subject,
      html: ownerEmailContent.html,
      text: ownerEmailContent.text,
      reply_to: [values.email],
    }),
    sendResendEmail({
      from: fromEmail,
      to: [values.email],
      subject: userEmailContent.subject,
      html: userEmailContent.html,
      text: userEmailContent.text,
    }),
  ]);
}
