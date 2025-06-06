import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { Onest } from 'next/font/google';

import { Providers } from '@/shared/processes/providers';

import { cn } from '@/shared/utils/cn';

import '@/shared/styles/globals.css';

const onest = Onest({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Benkyo — Learn Japanese via Telegram',
  description:
    'Study hiragana, katakana, kanji, and vocabulary with interactive modules, smart flashcards, and quizzes — all in one Telegram Mini App.',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('max-h-dvh overscroll-none antialiased', onest.className)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
