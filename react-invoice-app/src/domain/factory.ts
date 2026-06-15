import { newId } from './ids';
import type { Invoice, LineItem, Party } from './types';

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

export const emptyLineItem = (): LineItem => ({
    id: newId(),
    description: '',
    quantity: 1,
    unitPrice: 0,
    vatRate: 21,
});

export const emptyInvoice = (): Invoice => {
    const issueDate = today();
    return {
        id: newId(),
        number: '',
        issueDate,
        dueDate: addDays(issueDate, 14),
        supplier: emptyParty(),
        customer: emptyParty(),
        items: [emptyLineItem()],
        currency: 'CZK',
        templateId: 'classic',
        note: '',
        createAt: Date.now(),
        updateAt: Date.now(),
    };
};