import type { Currency, Locale, Money } from './types';

const MINOR_UNITS_PER_MAJOR = 100;

export function formatMoney(amount: Money, currency: Currency, locale: Locale): string {
    const major = amount / MINOR_UNITS_PER_MAJOR;
    const intLocale = locale === 'uk' ? 'uk-UA' : 'en-US';

    return new Intl.NumberFormat(intLocale,
        { style: 'currency', currency }).format(major);
}