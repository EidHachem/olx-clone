import en from "../locales/en.json";
import ar from "../locales/ar.json";

const dictionaries = {
  en,
  ar,
} as const;

export type SupportedLanguage = keyof typeof dictionaries;

export function translate(language: SupportedLanguage, key: string): string {
  const dict = dictionaries[language] as any;

  const parts = key.split(".");
  let current: any = dict;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return key;
    }
  }

  return typeof current === "string" ? current : key;
}
