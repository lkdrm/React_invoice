import { useState } from 'react';
import type { FC } from 'react';
import { useSettings } from '../state/useSettings';
import { useTranslation } from '../i18n/useTranslation';
import { SettingsForm } from '../components/SettingsForm';
import styles from '../styles/SettingsPage.module.css';

export const SettingsPage: FC = () => {
    const { settings, updateSettings } = useSettings();
    const { t } = useTranslation();
    const [savedNotice, setSavedNotice] = useState<boolean>(false);

    const handleChange = (patch: Partial<typeof settings>): void => {
        updateSettings(patch);

        setSavedNotice(true);
        window.setTimeout(() => setSavedNotice(false), 1500);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>{t('nav.settings')}</h1>

                {savedNotice ? (
                    <span className={styles.notice}>
                        {t('settings.saved')}
                    </span>
                ) : null}
            </header>

            <SettingsForm
                settings={settings}
                onChange={handleChange}
            />
        </div>
    );
};