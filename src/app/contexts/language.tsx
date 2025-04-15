'use client';

import { NextIntlClientProvider } from 'next-intl';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  getLocale: () => string | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const [timeZone, setTimeZone] = useState('Asia/Jakarta');

  useEffect(() => {
    // Get saved locale from localStorage
    const storedLocale = localStorage.getItem('locale');

    // Get browser language and match it with available translations
    const browserLocale = navigator.language.split('-')[0]; // e.g., "en", "id"
    const availableLocales = ['en', 'id'];

    const detectedLocale = storedLocale || (availableLocales.includes(browserLocale) ? browserLocale : 'en');

    setLocaleState(detectedLocale);

    // Detect user timezone
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(detectedTimeZone);
  }, []);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale); // Save selected language
    setLocaleState(newLocale);
  };

  const getLocale = () => {
    return localStorage.getItem('locale');
  }

  let messages;
  try {
    messages = require(`../../../messages/${locale}.json`);
  } catch (error) {
    messages = {};
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, getLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
