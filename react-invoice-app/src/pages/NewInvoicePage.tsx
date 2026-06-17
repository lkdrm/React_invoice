import { useState } from 'react';
import type { Invoice } from '../domain/types';
import { emptyInvoice } from '../domain/factory';
import { InvoiceForm } from '../components/InvoiceForm';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useTranslation } from '../il8n/useTranslation';

export const NewInvoicePage = () => {
    const [invoice, setInvoice] = useState<Invoice>(() => emptyInvoice());

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submit invoice:', invoice);
    };

    const { t } = useTranslation();

    return (
        <main>
            <h1>{t('nav.newInvoice')}</h1>
            <form onSubmit={handleSubmit} noValidate={false}>
                <InvoiceForm invoice={invoice} onChange={setInvoice} />
                <button type="submit">{t('actions.save')}</button>
                <div>
                    <LanguageSwitcher />
                </div>
            </form>
        </main>
    );
};