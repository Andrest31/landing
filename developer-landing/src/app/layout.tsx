import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Владислав Андрест — Frontend Developer',
  description:
    'Лендинг-презентация frontend-разработчика: React, TypeScript, API, AI-инструменты и проектный опыт.',
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
