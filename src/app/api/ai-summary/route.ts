import { NextResponse } from 'next/server';
import { generateDeveloperSummary, parseSummaryTone } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const tone = parseSummaryTone(body?.tone);
    const result = await generateDeveloperSummary(tone);

    return NextResponse.json({
      ok: true,
      tone,
      ...result,
    });
  } catch (error) {
    console.error('[ai-summary:route-error]', error);

    return NextResponse.json(
      {
        ok: false,
        message: 'Не удалось сгенерировать описание. Попробуйте еще раз.',
      },
      { status: 500 },
    );
  }
}
