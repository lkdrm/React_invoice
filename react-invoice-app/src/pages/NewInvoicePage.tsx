// src/pages/NewInvoicePage.tsx
import { InvoiceProvider } from '../state/InvoiceContext';
import { InvoiceForm } from '../components/InvoiceForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { PdfPreview } from '../pdf/PdfPreview';
import styles from '../styles/NewInvoicePage.module.css';

export function NewInvoicePage() {
    return (
        <InvoiceProvider>
            <div className={styles.layout}>
                <section className={styles.editor}>
                    <InvoiceForm />

                    <div>
                        <LanguageSwitcher />
                    </div>
                </section>
                <section className={styles.preview}>
                    <PdfPreview />
                </section>

            </div>
        </InvoiceProvider>
    );
}