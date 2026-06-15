import { useState } from 'react';
import type { Invoice } from '../domain/types';
import { emptyInvoice } from '../domain/factory';
import { InvoiceForm } from '../components/InvoiceForm';

export const NewInvoicePage = () => {
    const [invoice, setInvoice] = useState<Invoice>(() => emptyInvoice());

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submit invoice:', invoice);
    };

    return (
        <main>
            <h1>New Invoice</h1>
            <form onSubmit={handleSubmit} noValidate={false}>
                <InvoiceForm invoice={invoice} onChange={setInvoice} />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};