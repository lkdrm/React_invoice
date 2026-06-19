import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import type { Locale } from '../domain/types';
import styles from '../styles/LanguageSwitcher.module.css';

const SUPPORTED_LOCALES: ReadonlyArray<{ code: Locale; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'ua', label: 'Українська' },
    { code: 'cz', label: 'Čeština' },
];

export function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = SUPPORTED_LOCALES.find(
        (option) => option.code === locale
    );

    const handleSelect = (nextLocale: Locale) => {
        setLocale(nextLocale);
        setIsOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setIsOpen((current) => !current)}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <span className={styles.icon} aria-hidden="true">
                    🌐
                </span>

                <span className={styles.current}>
                    {currentLocale?.label}
                </span>

                <span className={styles.chevron} aria-hidden="true">
                    ▾
                </span>
            </button>

            {isOpen ? (
                <div className={styles.menu} role="menu">
                    {SUPPORTED_LOCALES.map((option) => (
                        <button
                            key={option.code}
                            type="button"
                            className={
                                option.code === locale
                                    ? styles.activeItem
                                    : styles.item
                            }
                            onClick={() => handleSelect(option.code)}>
                            {option.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}