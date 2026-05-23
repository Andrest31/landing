import type { Metadata, Viewport } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://developer-landing.example.com'),
  title: {
    default: 'Владислав Андрест — Frontend Developer',
    template: '%s — Владислав Андрест',
  },
  description:
    'Лендинг-презентация frontend-разработчика: React, TypeScript, API, AI-инструменты, контактная форма и проектный опыт.',
  keywords: [
    'Frontend Developer',
    'React',
    'TypeScript',
    'Next.js',
    'API',
    'AI helper',
    'Владислав Андрест',
  ],
  authors: [
    {
      name: 'Владислав Андрест',
    },
  ],
  openGraph: {
    title: 'Владислав Андрест — Frontend Developer',
    description:
      'React, TypeScript, API-интеграции, AI helper, рабочая форма и реальные проекты в одном лендинге.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030305',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
