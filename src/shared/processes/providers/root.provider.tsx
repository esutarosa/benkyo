'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react';
import { AppRoot, Spinner } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { ErrorPage } from '@/shared/ui/error-page';

import { useDidMount } from '@/shared/hooks/use-did-mount.hook';
import { setLocale } from '../i18n/locale';

export const RootProvider = ({ children }: PropsWithChildren) => {
  const lp = useLaunchParams();

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  useEffect(() => {
    if (initDataUser) {
      setLocale(initDataUser.language_code);
    }
  }, [initDataUser]);

  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={
          ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'
        }
      >
        {children}
      </AppRoot>
    </ErrorBoundary>
  ) : (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Spinner size='m' />
    </div>
  );
};
