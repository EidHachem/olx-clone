"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";
import { translate } from "@/lib/i18n";

export function useTranslation() {
  const { language } = useLanguage();

  return (key: string) => translate(language, key);
}
