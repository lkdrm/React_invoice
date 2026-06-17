import { useContext } from 'react';
import { I18nContext, I18nContextValue, dictionaries } from './I18nContext';
import type { TFunction } from './types';

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g;

export function useTranslation(): {
    t: TFunction;
    locale: I18nContextValue['locale'];
    setLocale: I18nContextValue['setLocale'];
} {
    const context = useContext(I18nContext);
    if (context === null) {
        throw new Error('useTranslation must be used inside <I18nProvider>');
    }

    const { locale, setLocale } = context;
    const dictionary = dictionaries[locale];

    const t: TFunction = (key, params) => {
        const template = dictionary[key] ?? key;
        if (params === undefined) {
            return template;
        }
        return template.replace(PLACEHOLDER_PATTERN, (match, placeholderName: string) => {
            const replacement = params[placeholderName];
            return replacement === undefined ? match : String(replacement);
        });
    };
    return { t, locale, setLocale }
}