import type { FC } from 'react';
import type { Settings, Currency } from '../domain/types';
import { useTranslation } from '../i18n/useTranslation';
import { PartyEditor } from './PartyEditor';
import { templates } from '../pdf/TemplateRegistry';
import styles from '../styles/SettingsForm.module.css';

interface SettingsFormProps {
    settings: Settings;
    onChange: (patch: Partial<Settings>) => void;
}

const CURRENCIES: Currency[] = ['CZK', 'EUR', 'UAH', 'USD'];
const VAT_OPTIONS = [0, 10, 15, 21] as const;

export const SettingsForm: FC<SettingsFormProps> = ({ settings, onChange }) => {
    const { t, locale } = useTranslation();

    return (
        <div className={styles.form}>
            <section className={styles.section}>
                <h2>{t('settings.yourCompany')}</h2>
                <PartyEditor
                    party={settings.defaultSupplier}
                    onChange={(party) => onChange({ defaultSupplier: party })}
                />
            </section>

            <section className={styles.section}>
                <h2>{t('settings.defaults')}</h2>

                <label className={styles.field}>
                    <span>{t('invoice.currency')}</span>
                    <select
                        value={settings.defaultCurrency}
                        onChange={(event) => onChange({ defaultCurrency: event.target.value as Currency })}
                    >
                        {CURRENCIES.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </label>

                <label className={styles.field}>
                    <span>{t('settings.defaultVatRate')}</span>

                    <select
                        value={settings.defaultVatRate}
                        onChange={(event) =>
                            onChange({
                                defaultVatRate: Number(event.target.value),
                            })
                        }
                    >
                        {VAT_OPTIONS.map((rate) => (
                            <option key={rate} value={rate}>
                                {rate} %
                            </option>
                        ))}
                    </select>
                </label>

                <label className={styles.field}>
                    <span>{t('settings.defaultTemplate')}</span>
                    <select
                        value={settings.invoiceTemplateId}
                        onChange={(event) => onChange({ invoiceTemplateId: event.target.value })}
                    >
                        {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.displayName[locale]}
                            </option>
                        ))}
                    </select>
                </label>
            </section>

            <section className={styles.section}>
                <h2>{t('settings.numbering')}</h2>
                <label className={styles.field}>
                    <span>{t('settings.invoiceNumberPrefix')}</span>
                    <input
                        type="text"
                        value={settings.invoiceNumberPrefix}
                        onChange={(event) => onChange({ invoiceNumberPrefix: event.target.value })}
                        placeholder="2026-"
                    />
                </label>
            </section>
        </div>
    );
};