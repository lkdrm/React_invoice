import { useState } from 'react';
import { InvoiceProvider } from '../state/InvoiceContext';
import { InvoiceForm } from '../components/InvoiceForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { PdfPreview } from '../pdf/PdfPreview';
import { TemplatePicker } from '../pdf/TemplatePicker';
import styles from '../styles/NewInvoicePage.module.css';

export function NewInvoicePage() {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <InvoiceProvider>
            <div className={styles.layout}>
                <section className={styles.editor}>
                    <div className={styles.topBar}>
                        <LanguageSwitcher />
                        <button
                            className={styles.previewTriggerBtn}
                            onClick={() => setShowPreview(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Preview PDF
                        </button>
                    </div>
                    <InvoiceForm />
                </section>

                {showPreview && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <div className={styles.modalTools}>
                                    <TemplatePicker />
                                </div>
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setShowPreview(false)}>
                                    ✕ Close
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <PdfPreview />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InvoiceProvider>
    );
}