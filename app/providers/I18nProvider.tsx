"use client";

import { createContext, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

const I18nContext = createContext<{
  locale: string;
  t: (key: string) => string;
  changeLanguage: (newLocale: string) => void;
} | null>(null);

export function I18nProvider({ children, locale, translations }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const t = (key: string) => {
    return key.split(".").reduce((obj, i) => obj?.[i], translations) || key;
  };

  const changeLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLanguage }}>
      <div style={{ opacity: isPending ? 0.7 : 1 }}>{children}</div>
    </I18nContext.Provider>
  );
}

export const useLocale = () => useContext(I18nContext)!;
