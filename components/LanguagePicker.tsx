"use client";

import { useLocale } from "@/app/providers/I18nProvider";

type Props = {
  color?: "white" | "black";
};

export function LanguagePicker({ color }: Props) {
  const { locale, changeLanguage } = useLocale();

  return (
    <div className="flex gap-4">
      {["en", "fr", "de"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={
            locale === lang
              ? `font-bold text-${color} text-lg`
              : `text-${color} text-lg`
          }
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
