'use client';

import { hapticFeedback, openLink } from '@telegram-apps/sdk-react';
import {
  type LinkProps as NextLinkProps,
  default as NextLink,
} from 'next/link';
import { type MouseEventHandler, type JSX, useCallback } from 'react';

import { cn } from '@/shared/utils/cn';

interface LinkProps
  extends NextLinkProps,
    Omit<JSX.IntrinsicElements['a'], 'href'> {}

export const Link = ({
  className,
  onClick: propsOnClick,
  href,
  ...rest
}: LinkProps) => {
  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    e => {
      propsOnClick?.(e);

      if (
        hapticFeedback.isSupported() &&
        hapticFeedback.selectionChanged.ifAvailable()
      ) {
        hapticFeedback.selectionChanged();
        hapticFeedback.impactOccurred('soft');
      }

      let path: string;
      if (typeof href === 'string') {
        path = href;
      } else {
        const { search = '', pathname = '', hash = '' } = href;
        path = `${pathname}?${search}#${hash}`;
      }

      const targetUrl = new URL(path, window.location.toString());
      const currentUrl = new URL(window.location.toString());
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host;

      if (isExternal) {
        e.preventDefault();
        openLink(targetUrl.toString());
      }
    },
    [href, propsOnClick]
  );

  return (
    <NextLink
      href={href}
      className={cn('no-underline', className)}
      onClick={onClick}
      {...rest}
    />
  );
};
