'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type GoBackLayoutProps = PropsWithChildren<{
  back?: boolean;
}>;

export const GoBackLayout = ({ children, back = true }: GoBackLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
};
