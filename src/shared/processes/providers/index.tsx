'use client';

import { TanstackProvider } from './tanstack.provider';
import { RootProvider } from './root.provider';

import type { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TanstackProvider>
      <RootProvider>{children}</RootProvider>
    </TanstackProvider>
  );
};
