import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { timeZone } from '../i18n/config';

import type { PropsWithChildren } from 'react';

export const I18nProvider = async ({ children }: PropsWithChildren) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
};
