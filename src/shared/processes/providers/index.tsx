'use client';

import { TanstackProvider } from './tanstack.provider';
import { RootProvider } from './root.provider';

import type { FC, PropsWithChildren } from 'react';
import { I18nProvider } from './i18n.provider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nProvider>
      <TanstackProvider>
        <RootProvider>{children}</RootProvider>
      </TanstackProvider>
    </I18nProvider>
  );
};
