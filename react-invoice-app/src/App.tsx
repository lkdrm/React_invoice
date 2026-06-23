import { useState, useEffect } from 'react';
import { NewInvoicePage } from './pages/NewInvoicePage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { useTranslation } from './i18n/useTranslation';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import { useSettings } from './state/useSettings';
import styles from './styles/App.module.css';

type Page = 'new-invoice' | 'history' | 'settings';

export const App = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('new-invoice');
  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{t('app.title')}</h1>

        <nav className={styles.nav}>
          <button
            type="button"
            className={
              currentPage === 'new-invoice'
                ? styles.active
                : ''
            }
            onClick={() => setCurrentPage('new-invoice')}
          >
            {t('nav.newInvoice')}
          </button>

          <button
            type="button"
            className={
              currentPage === 'history'
                ? styles.active
                : ''
            }
            onClick={() => setCurrentPage('history')}
          >
            {t('nav.history')}
          </button>

          <button
            type="button"
            className={
              currentPage === 'settings'
                ? styles.active
                : ''
            }
            onClick={() => setCurrentPage('settings')}
          >
            {t('nav.settings')}
          </button>
        </nav>

        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        {currentPage === 'new-invoice' ? <NewInvoicePage /> : null}
        {currentPage === 'history' ? <HistoryPage /> : null}
        {currentPage === 'settings' ? <SettingsPage /> : null}
      </main>
    </div>
  );
};

export default App;