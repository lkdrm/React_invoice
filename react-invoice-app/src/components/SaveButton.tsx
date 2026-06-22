import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { useFileSave } from '../hooks/useFileSave';
import { getTemplate } from '../pdf/TemplateRegistry';
import { invoiceRepo } from '../persistence/invoiceRepo';
import styles from '../styles/SaveButton.module.css';

const FILENAME_PREFIX = 'invoice-';
const FILENAME_EXTENSION = '.pdf';

export function SaveButton() {
    const { invoice, dispatch } = useInvoice();
    const { t, locale } = useTranslation();
    const { savePdf } = useFileSave();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (): Promise<void> => {
        const now = Date.now();
        const nextInvoice = {
            ...invoice,
            updateAt: now,
        };

        setIsSaving(true);

        try {
            dispatch({
                type: 'patch-invoice',
                patch: {
                    updateAt: now,
                },
            });

            const TemplateComponent = getTemplate(invoice.templateId).Component;

            const blob = await pdf(
                <TemplateComponent
                    invoice={nextInvoice}
                    t={t}
                    locale={locale}
                />
            ).toBlob();

            const suggestedName = `${FILENAME_PREFIX}${invoice.number || 'new'}${FILENAME_EXTENSION}`;

            await savePdf(blob, suggestedName);

            await Promise.resolve(invoiceRepo.save(nextInvoice));
        } catch (exception) {
            console.error('Failed to save invoice', exception);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving}>
            {isSaving ? 'Saving...' : t('form.save')}
        </button>
    );
}