import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/mail';
import {
  hasValidationErrors,
  normalizeContactValues,
  validateContactValues,
} from '@/lib/validation';
import type { ContactApiResponse, ContactFormValues } from '@/types/contact';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormValues;
    const values = normalizeContactValues({
      name: body.name ?? '',
      phone: body.phone ?? '',
      email: body.email ?? '',
      comment: body.comment ?? '',
    });

    const errors = validateContactValues(values);

    if (hasValidationErrors(errors)) {
      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          message: 'Проверьте поля формы',
          errors,
        },
        { status: 400 },
      );
    }

    await sendContactEmails(values);

    return NextResponse.json<ContactApiResponse>({
      ok: true,
      message: 'Сообщение отправлено. Копия письма отправлена на ваш email.',
    });
  } catch (error) {
    console.error('[api/contact]', error);

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message:
          'Не удалось отправить сообщение. Попробуйте позже или напишите напрямую на email.',
      },
      { status: 500 },
    );
  }
}
