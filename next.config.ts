import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'uk', 'ru'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
