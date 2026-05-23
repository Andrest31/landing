import nodemailer from 'nodemailer';
import type { ContactFormValues } from '@/types/contact';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
};

const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === undefined
      ? port === 465
      : process.env.SMTP_SECURE === 'true';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getRequiredEnv('SMTP_USER'),
      pass: getRequiredEnv('SMTP_PASSWORD'),
    },
  });
};

const createEmailLayout = ({
  title,
  preview,
  content,
}: {
  title: string;
  preview: string;
  content: string;
}) => `
  <!doctype html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#050507;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
        ${preview}
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050507;padding:28px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#15151c;border:1px solid rgba(255,255,255,0.16);border-radius:24px;overflow:hidden;">
              <tr>
                <td style="padding:28px 30px 22px;background:linear-gradient(135deg,#101018 0%,#1d1d2a 100%);border-bottom:1px solid rgba(255,255,255,0.12);">
                  <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#a3ff12;margin-bottom:14px;">
                    Developer Landing
                  </div>
                  <h1 style="margin:0;color:#ffffff;font-size:30px;line-height:1.08;font-weight:800;letter-spacing:-0.04em;">
                    ${title}
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding:30px;">
                  ${content}
                </td>
              </tr>

              <tr>
                <td style="padding:20px 30px;background:#0d0d12;border-top:1px solid rgba(255,255,255,0.1);">
                  <p style="margin:0;color:#a8a8b8;font-size:13px;line-height:1.5;">
                    Это автоматическое письмо с лендинга Владислава Андреста.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const createInfoRow = (label: string, value: string) => `
  <tr>
    <td style="padding:0 0 8px;color:#a8a8b8;font-size:14px;font-weight:700;width:120px;vertical-align:top;">
      ${label}
    </td>
    <td style="padding:0 0 8px;color:#ffffff;font-size:15px;line-height:1.45;vertical-align:top;">
      ${value}
    </td>
  </tr>
`;

function createOwnerEmail(values: ContactFormValues) {
  const safeName = escapeHtml(values.name);
  const safePhone = escapeHtml(values.phone);
  const safeEmail = escapeHtml(values.email);
  const safeComment = escapeHtml(values.comment).replaceAll('\n', '<br />');

  const content = `
    <p style="margin:0 0 22px;color:#d7d7e5;font-size:16px;line-height:1.55;">
      Пользователь отправил сообщение через контактную форму лендинга.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;">
      ${createInfoRow('Имя', safeName)}
      ${createInfoRow('Телефон', safePhone)}
      ${createInfoRow('Email', `<a href="mailto:${safeEmail}" style="color:#a3ff12;text-decoration:none;">${safeEmail}</a>`)}
    </table>

    <div style="margin-top:18px;">
      <div style="margin-bottom:10px;color:#a8a8b8;font-size:14px;font-weight:700;">Комментарий</div>
      <div style="padding:18px 20px;border-radius:18px;background:#20202a;color:#ffffff;font-size:15px;line-height:1.55;border:1px solid rgba(255,255,255,0.1);">
        ${safeComment}
      </div>
    </div>
  `;

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
    html: createEmailLayout({
      title: 'Новая заявка с лендинга',
      preview: `Новая заявка от ${safeName}`,
      content,
    }),
  };
}

function createUserCopyEmail(values: ContactFormValues, ownerEmail: string) {
  const safeName = escapeHtml(values.name);
  const safeComment = escapeHtml(values.comment).replaceAll('\n', '<br />');
  const safeOwnerEmail = escapeHtml(ownerEmail);

  const content = `
    <p style="margin:0 0 16px;color:#d7d7e5;font-size:16px;line-height:1.55;">
      ${safeName}, спасибо за сообщение. Я получил вашу заявку и отвечу в ближайшее время.
    </p>

    <p style="margin:0 0 22px;color:#a8a8b8;font-size:14px;line-height:1.55;">
      Ниже — копия вашего обращения. Если нужно дополнить сообщение, можно ответить на это письмо или написать напрямую:
      <a href="mailto:${safeOwnerEmail}" style="color:#a3ff12;text-decoration:none;">${safeOwnerEmail}</a>.
    </p>

    <div style="margin-top:18px;">
      <div style="margin-bottom:10px;color:#a8a8b8;font-size:14px;font-weight:700;">Ваш комментарий</div>
      <div style="padding:18px 20px;border-radius:18px;background:#20202a;color:#ffffff;font-size:15px;line-height:1.55;border:1px solid rgba(255,255,255,0.1);">
        ${safeComment}
      </div>
    </div>
  `;

  return {
    subject: 'Копия вашей заявки — Владислав Андрест',
    text: [
      `${values.name}, спасибо за сообщение!`,
      '',
      'Я получил вашу заявку и отвечу в ближайшее время.',
      '',
      'Ваш комментарий:',
      values.comment,
      '',
      `Email для связи: ${ownerEmail}`,
    ].join('\n'),
    html: createEmailLayout({
      title: 'Спасибо за сообщение!',
      preview: 'Копия вашего обращения с лендинга Владислава Андреста',
      content,
    }),
  };
}

export async function sendContactEmails(values: ContactFormValues) {
  const isMockMode = process.env.CONTACT_MOCK_EMAIL === 'true';
  const ownerEmail = process.env.CONTACT_OWNER_EMAIL || 'andrestvlad@gmail.com';
  const fromEmail =
    process.env.MAIL_FROM ||
    `Vladislav Andrest <${process.env.SMTP_USER || ownerEmail}>`;

  if (isMockMode) {
    console.info('[contact-form:mock]', values);
    return;
  }

  const transporter = createTransporter();
  const ownerEmailContent = createOwnerEmail(values);
  const userEmailContent = createUserCopyEmail(values, ownerEmail);

  await Promise.all([
    transporter.sendMail({
      from: fromEmail,
      to: ownerEmail,
      replyTo: values.email,
      subject: ownerEmailContent.subject,
      html: ownerEmailContent.html,
      text: ownerEmailContent.text,
    }),
    transporter.sendMail({
      from: fromEmail,
      to: values.email,
      replyTo: ownerEmail,
      subject: userEmailContent.subject,
      html: userEmailContent.html,
      text: userEmailContent.text,
    }),
  ]);
}
