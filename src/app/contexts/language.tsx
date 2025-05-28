'use client';

import { NextIntlClientProvider } from 'next-intl';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  getLocale: () => string | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const [messages, setMessages] = useState<Record<string, any> | null>(null);
  const [timeZone, setTimeZone] = useState('Asia/Jakarta');

  useEffect(() => {
    const loadLocale = async () => {
      const storedLocale = localStorage.getItem('locale');
      const browserLocale = navigator.language.split('-')[0];
      const availableLocales = ['en', 'id'];
      const detectedLocale = storedLocale || (availableLocales.includes(browserLocale) ? browserLocale : 'en');

      setLocaleState(detectedLocale);

      try {
        const msgs = await import(`@/messages/${detectedLocale}.json`).then(mod => mod.default);
        setMessages(msgs);
      } catch (error) {
        console.warn(`Missing translation for locale "${detectedLocale}"`);
        setMessages({});
      }

      const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(detectedTimeZone);
    };

    loadLocale();
  }, []);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
    // Optionally: reload or trigger re-fetch messages
    location.reload(); // reload is simplest if you don’t want to handle dynamic message loading
  };

  const getLocale = () => {
    return localStorage.getItem('locale');
  };

  // Wait until messages are loaded
  if (!messages) return null;

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
