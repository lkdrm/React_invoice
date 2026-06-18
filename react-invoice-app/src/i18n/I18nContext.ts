import { createContext } from 'react';
import type { Dictionary, Locale } from './types';
import englishDictionary from './dictionaries/en.json';
import ukrainianDictionary from './dictionaries/ua.json';
import czechDictionary from './dictionaries/cz.json';

export const DEFAULT_LOCALE: Locale = 'en';

export const dictionaries: Record<Locale, Dictionary> = {
    en: englishDictionary,
    ua: ukrainianDictionary,
    cz: czechDictionary,
};

export interface I18nContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    dictionary: Dictionary;
}

// Export the context itself
export const I18nContext = createContext<I18nContextValue | null>(null);