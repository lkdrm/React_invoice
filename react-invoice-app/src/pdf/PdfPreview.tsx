import { PDFViewer } from '@react-pdf/renderer';
import type { FC } from 'react';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { ClassicTemplate } from './template/ClassicTemplate';
import styles from '../styles/PdfPreview.module.css';

export const PdfPreview: FC = () => {
    const { invoice } = useInvoice();
    const { t, locale } = useTranslation();

    return (
        <div className={styles.preview}>
            <PDFViewer className={styles.viewer} showToolbar>
                <ClassicTemplate invoice={invoice} t={t} locale={locale} />
            </PDFViewer>
        </div>
    );
};