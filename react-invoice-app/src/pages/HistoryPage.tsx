import { useTranslation } from '../i18n/useTranslation';

export const HistoryPage = () => {
    const { t } = useTranslation();
    return <div style={{ padding: 24 }}>{t('nav.history')}</div>;
};