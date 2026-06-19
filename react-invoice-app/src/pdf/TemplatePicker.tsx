import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { templates } from './TemplateRegistry';
import styles from '../styles/TemplatePicker.module.css';

export function TemplatePicker() {
    const { invoice, dispatch } = useInvoice();
    const { t, locale } = useTranslation();

    return (
        <label className={styles.picker}>
            <span>{t('pdf.template')}</span>

            <select
                value={invoice.templateId}
                onChange={(event) =>
                    dispatch({
                        type: 'set-field',
                        field: 'templateId',
                        value: event.target.value,
                    })
                }
            >
                {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                        {template.displayName[locale]}
                    </option>
                ))}
            </select>
        </label>
    );
}