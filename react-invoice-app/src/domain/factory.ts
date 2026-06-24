import { newId } from './ids';
import type { Invoice, LineItem, Party, Settings } from './types';

const emptyParty = (): Party => ({
    name: '',
    address: '',
    taxId: '',
    vatId: '',
});

const today = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const addDays = (isoDate: string, days: number): string => {
    const date = new Date(isoDate);
    date.setDate(date.getDate() + days);

    return date.toISOString().slice(0, 10);
};

export const emptyLineItem = (
    vatRate: number = 21,
): LineItem => ({
    id: newId(),
    description: '',
    quantity: 1,
    unitPrice: 0,
    vatRate,
});

export const emptyInvoice = (
    settings?: Settings,
    suggestedNumber?: string
): Invoice => {
    const now = Date.now();
    const issueDate = today();

    return {
        id: newId(),
        number: suggestedNumber ?? '',
        issueDate,
        dueDate: addDays(issueDate, 14),

        supplier: settings
            ? { ...settings.defaultSupplier }
            : emptyParty(),

        customer: emptyParty(),

        items: [
            emptyLineItem(settings?.defaultVatRate ?? 21),
        ],

        currency: settings?.defaultCurrency ?? 'CZK',
        templateId: settings?.invoiceTemplateId ?? 'classic',

        note: '',
        createAt: now,
        updateAt: now,

        taxableSupplyDate: issueDate,
        vatMode: 'with-vat',
    };
};