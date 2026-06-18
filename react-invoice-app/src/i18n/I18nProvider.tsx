import { useMemo, type ReactNode } from 'react';
import type { Locale } from './types';
import {
    I18nContext,
    DEFAULT_LOCALE,
    dictionaries,
    type I18nContextValue,
} from './I18nContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LOCALE_KEY = 'app.locale'

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useLocalStorage<Locale>(
        LOCALE_KEY, DEFAULT_LOCALE
    );

    const value = useMemo<I18nContextValue>(() => ({
        locale,
        setLocale,
        dictionary: dictionaries[locale]
    }),
        [locale, setLocale]);

    return (<I18nContext.Provider value={value}>
        {children}
    </I18nContext.Provider>
    );
}