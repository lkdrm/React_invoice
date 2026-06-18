// src/pages/NewInvoicePage.tsx
import { InvoiceProvider } from '../state/InvoiceContext';
import { InvoiceForm } from '../components/InvoiceForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function NewInvoicePage() {
    return (
        <InvoiceProvider>
            <InvoiceForm />
            <div>
                <LanguageSwitcher />
            </div>
        </InvoiceProvider>
    );
}