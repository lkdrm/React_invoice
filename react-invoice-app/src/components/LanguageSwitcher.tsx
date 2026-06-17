import { useTranslation } from "../il8n/useTranslation";
import type { Locale } from "../domain/types";

const SUPPORTED_LOCALES: ReadonlyArray<{ code: Locale; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'ua', label: 'Українська' },
    { code: 'cz', label: 'Czech' }
];

export function LanguageSwitcher() {
    const { locale, setLocale, t } = useTranslation();

    return (
        <label className="language-switcher">
            <span>{t('actions.languageSwitch')}</span>
            <select value={locale} onChange={(changeEvent) => setLocale(changeEvent.target.value as Locale)}>
                {SUPPORTED_LOCALES.map((option) => (
                    <option key={option.code} value={option.code}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}