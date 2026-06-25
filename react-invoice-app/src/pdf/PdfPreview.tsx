import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import type { FC } from 'react';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { getTemplate } from './TemplateRegistry';
import styles from '../styles/PdfPreview.module.css';

const isMobile = () =>
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const PdfPreview: FC = () => {
    const { invoice } = useInvoice();
    const { t, locale } = useTranslation();

    const TemplateComponent = getTemplate(invoice.templateId).Component;

    const document = (
        <TemplateComponent invoice={invoice} t={t} locale={locale} />
    );

    if (isMobile()) {
        return (
            <div className={styles.preview}>
                <div className={styles.mobilePreview}>
                    <p className={styles.mobileText}>
                        PDF preview is not supported well on mobile browsers.
                    </p>

                    <BlobProvider document={document}>
                        {({ url, loading, error }) => {
                            if (loading) return <p>Generating PDF...</p>;
                            if (error || !url) return <p>Failed to generate PDF.</p>;

                            return (
                                <a
                                    className={styles.mobileButton}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open PDF
                                </a>
                            );
                        }}
                    </BlobProvider>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.preview}>
            <PDFViewer className={styles.viewer}>{document}</PDFViewer>
        </div>
    );
};