import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import { useTranslation } from './i18n/useTranslation';
import { HistoryPage } from './pages/HistoryPage';
import { NewInvoicePage } from './pages/NewInvoicePage';
import { SettingsPage } from './pages/SettingsPage';
import { useSettings } from './state/useSettings';
import type { Invoice } from './domain/types';
import styles from './styles/App.module.css';

type Page = 'new-invoice' | 'history' | 'settings';

export const App = () => {
    const { t } = useTranslation();
    const { settings } = useSettings();

    const [currentPage, setCurrentPage] = useState<Page>('new-invoice');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);

    useEffect(() => {
        document.documentElement.dataset.theme = settings.theme;
    }, [settings.theme]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const scrollToPageTop = (): void => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    };

    const navigateTo = (page: Page): void => {
        if (page === 'new-invoice') {
            setInvoiceToEdit(null);
        }
        setCurrentPage(page);
        setIsMobileMenuOpen(false);
        scrollToPageTop();
    };

    const openInvoiceForEdit = (invoice: Invoice): void => {
        setInvoiceToEdit(invoice);
        setCurrentPage('new-invoice');
        setIsMobileMenuOpen(false);
        scrollToPageTop();
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.brand}
                    onClick={() => navigateTo('new-invoice')}
                >
                    {t('app.title')}
                </button>

                <nav className={styles.desktopNav} aria-label="Main navigation">
                    <button
                        type="button"
                        className={currentPage === 'new-invoice' ? styles.active : ''}
                        onClick={() => navigateTo('new-invoice')}
                    >
                        {t('nav.newInvoice')}
                    </button>

                    <button
                        type="button"
                        className={currentPage === 'history' ? styles.active : ''}
                        onClick={() => navigateTo('history')}
                    >
                        {t('nav.history')}
                    </button>

                    <button
                        type="button"
                        className={currentPage === 'settings' ? styles.active : ''}
                        onClick={() => navigateTo('settings')}
                    >
                        {t('nav.settings')}
                    </button>
                </nav>

                <div className={styles.desktopTools}>
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>

                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                    aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation">
                    <svg className={styles.menuIcon}
                        viewBox='0 0 24 24'
                        fill='none'
                        aria-hidden='true'>
                        <path
                            d="M4 7h16M4 12h16M4 17h16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </header>

            {isMobileMenuOpen ? (
                <>
                    <button
                        type="button"
                        className={styles.menuBackdrop}
                        aria-label="Close navigation menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <aside
                        id="mobile-navigation"
                        className={styles.mobileMenu}
                        aria-label="Mobile navigation"
                    >
                        <div className={styles.mobileMenuHeader}>
                            <span>{t('app.title')}</span>

                            <button
                                type="button"
                                className={styles.closeMenuButton}
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Close navigation"
                            >
                                ×
                            </button>
                        </div>

                        <nav className={styles.mobileNav}>
                            <button
                                type="button"
                                className={currentPage === 'new-invoice' ? styles.active : ''}
                                onClick={() => navigateTo('new-invoice')}
                            >
                                {t('nav.newInvoice')}
                            </button>

                            <button
                                type="button"
                                className={currentPage === 'history' ? styles.active : ''}
                                onClick={() => navigateTo('history')}
                            >
                                {t('nav.history')}
                            </button>

                            <button
                                type="button"
                                className={currentPage === 'settings' ? styles.active : ''}
                                onClick={() => navigateTo('settings')}
                            >
                                {t('nav.settings')}
                            </button>
                        </nav>

                        <div className={styles.mobileTools}>
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </aside>
                </>
            ) : null}

            <main className={styles.main}>
                {currentPage === 'new-invoice' ? (
                    <NewInvoicePage
                        key={invoiceToEdit?.id ?? 'new-invoice'}
                        initialInvoice={invoiceToEdit ?? undefined}
                    />
                ) : null}

                {currentPage === 'history' ? (<HistoryPage onOpenInvoice={openInvoiceForEdit} />
                ) : null}

                {currentPage === 'settings' ? <SettingsPage /> : null}

            </main>
        </div>
    );
};

export default App;