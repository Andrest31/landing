export type SummaryTone = 'concise' | 'friendly' | 'technical';

export type AiSummaryResult = {
  summary: string;
  source: 'openai' | 'fallback';
};

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';

export const allowedSummaryTones: SummaryTone[] = ['concise', 'friendly', 'technical'];

const fallbackSummaries: Record<SummaryTone, string> = {
  concise:
    'Владислав Андрест — frontend-разработчик, который работает с React, TypeScript, API-интеграциями и сложными пользовательскими сценариями: формами, таблицами, картами, дашбордами и состояниями интерфейса.',
  friendly:
    'Привет! Я Владислав Андрест, frontend-разработчик. Люблю собирать понятные и аккуратные интерфейсы на React и TypeScript, подключать их к API, продумывать состояния загрузки и ошибок, а также доводить фичи до рабочего результата.',
  technical:
    'Frontend-разработчик с фокусом на React, TypeScript, Next.js, REST API и архитектуру клиентских приложений. Работает с асинхронными данными, UI-состояниями, оптимизацией рендера, валидацией форм и структурированием проектов.',
};

function isSummaryTone(value: unknown): value is SummaryTone {
  return typeof value === 'string' && allowedSummaryTones.includes(value as SummaryTone);
}

function createPrompt(tone: SummaryTone) {
  return [
    'Сгенерируй короткое описание frontend-разработчика для лендинга-портфолио.',
    'Пиши на русском языке.',
    'Не используй markdown.',
    'Длина: 2-3 предложения.',
    `Тон: ${tone}.`,
    '',
    'Факты о разработчике:',
    '- Имя: Владислав Андрест.',
    '- Специализация: frontend-разработка.',
    '- Стек: React, TypeScript, Next.js, Redux Toolkit, MobX, SCSS Modules, Tailwind, MUI.',
    '- Работает с REST API, PostgreSQL, Git, Docker, GitHub Actions, Vite.',
    '- Проекты: Fin-Panel для мониторинга операций и антифрода; Friendly — TMA для студенческих знакомств; Citizen — интерфейс для анализа 100 000+ записей; дипломный проект по LiDAR-данным и поиску археологических кандидатов.',
    '- В работе уделяет внимание структуре проекта, API-интеграциям, loading/success/error состояниям, валидации и пользовательским сценариям.',
  ].join('\n');
}

function normalizeSummary(value: unknown, tone: SummaryTone) {
  if (typeof value !== 'string') {
    return fallbackSummaries[tone];
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallbackSummaries[tone];
  }

  return trimmed;
}

export function parseSummaryTone(value: unknown): SummaryTone {
  if (!isSummaryTone(value)) {
    return 'concise';
  }

  return value;
}

export async function generateDeveloperSummary(tone: SummaryTone): Promise<AiSummaryResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const shouldUseMock = process.env.AI_MOCK_MODE === 'true';

  if (shouldUseMock || !apiKey) {
    return {
      summary: fallbackSummaries[tone],
      source: 'fallback',
    };
  }

  try {
    const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Ты помогаешь кратко и профессионально описывать разработчика на лендинге-портфолио.',
          },
          {
            role: 'user',
            content: createPrompt(tone),
          },
        ],
        temperature: 0.7,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ai-summary:openai-error]', response.status, errorText);

      return {
        summary: fallbackSummaries[tone],
        source: 'fallback',
      };
    }

    const data = await response.json();
    const summary = normalizeSummary(data?.choices?.[0]?.message?.content, tone);

    return {
      summary,
      source: 'openai',
    };
  } catch (error) {
    console.error('[ai-summary:unexpected-error]', error);

    return {
      summary: fallbackSummaries[tone],
      source: 'fallback',
    };
  }
}
