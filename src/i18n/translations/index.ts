import { es, type Translations } from "./es";
import { en } from "./en";

export type { Translations };
export type LanguageCode = "es" | "en";

export const translations: Record<LanguageCode, Translations> = {
  es,
  en,
};

export const languages = [
  { code: "es" as const, name: "Español" },
  { code: "en" as const, name: "English" },
] as const;

export type Language = (typeof languages)[number];
