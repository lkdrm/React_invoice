import { PDFViewer } from '@react-pdf/renderer';
import type { FC } from 'react';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { getTemplate } from './TemplateRegistry';
import styles from '../styles/PdfPreview.module.css';

export const PdfPreview: FC = () => {
    const { invoice } = useInvoice();
    const { t, locale } = useTranslation();

    const TemplateComponent = getTemplate(invoice.templateId).Component;

    return (
        <div className={styles.preview}>
            <PDFViewer className={styles.viewer}>
                <TemplateComponent invoice={invoice} t={t} locale={locale} />
            </PDFViewer>
        </div>
    );
};