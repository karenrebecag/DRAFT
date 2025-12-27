import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  translations,
  languages,
  type LanguageCode,
  type Translations,
  type Language,
} from "./translations";

interface I18nContextType {
  locale: LanguageCode;
  t: Translations;
  setLocale: (locale: LanguageCode) => void;
  languages: readonly Language[];
  currentLanguage: Language;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "draftstudio-locale";

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: LanguageCode;
}

export function I18nProvider({
  children,
  defaultLocale = "es",
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<LanguageCode>(() => {
    // Try to get saved locale from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === "es" || saved === "en")) {
        return saved;
      }
    }
    return defaultLocale;
  });

  const setLocale = useCallback((newLocale: LanguageCode) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
      // Update document lang attribute for accessibility
      document.documentElement.lang = newLocale;
    }
  }, []);

  // Set initial document lang
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const value: I18nContextType = {
    locale,
    t: translations[locale],
    setLocale,
    languages,
    currentLanguage,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Hook for just translations (lightweight)
export function useTranslations(): Translations {
  const { t } = useI18n();
  return t;
}

// Hook for locale management
export function useLocale() {
  const { locale, setLocale, languages, currentLanguage } = useI18n();
  return { locale, setLocale, languages, currentLanguage };
}
