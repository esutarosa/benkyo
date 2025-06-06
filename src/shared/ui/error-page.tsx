'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset?: () => void;
};

export const ErrorPage = ({ error }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Oops</div>;
};
