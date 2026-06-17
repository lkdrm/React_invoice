import { useMemo, useState, type ReactNode } from 'react';
import type { Locale } from './types';
import { I18nContext, DEFAULT_LOCALE, type I18nContextValue } from './I18nContext';

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

    const value = useMemo<I18nContextValue>(() => ({ locale, setLocale }), [locale]);

    return (<I18nContext.Provider value={value}>
        {children}
    </I18nContext.Provider>
    );
}