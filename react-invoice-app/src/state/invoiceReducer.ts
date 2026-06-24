import type { Invoice, LineItem } from '../domain/types';
import type { InvoiceAction } from './types';

export function emptyInvoice(): Invoice {
    const now = Date.now();
    return {
        id: crypto.randomUUID(),
        number: '',
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
        supplier: { name: '', address: '', taxId: '', vatId: '' },
        customer: { name: '', address: '', taxId: '', vatId: '' },
        items: [emptyLineItem()],
        currency: 'CZK',
        templateId: 'classic',
        createAt: now,
        updateAt: now,
        vatMode: 'with-vat',
        taxableSupplyDate: new Date().toISOString().slice(0, 10),
    };
}

function emptyLineItem(): LineItem {
    return {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        vatRate: 21,
    };
}

export function invoiceReducer(state: Invoice, action: InvoiceAction): Invoice {
    switch (action.type) {
        case 'set-field':
            return {
                ...state,
                [action.field]: action.value,
                updateAt: Date.now(),
            };

        case 'set-supplier-field':
            return {
                ...state,
                supplier: { ...state.supplier, [action.field]: action.value },
                updateAt: Date.now(),
            };

        case 'set-customer-field':
            return {
                ...state,
                customer: { ...state.customer, [action.field]: action.value },
                updateAt: Date.now(),
            };

        case 'add-item':
            return {
                ...state,
                items: [...state.items, emptyLineItem()],
                updateAt: Date.now(),
            };

        case 'update-item':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id ? { ...item, ...action.patch } : item
                ),
                updateAt: Date.now(),
            };

        case 'remove-item':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id),
                updateAt: Date.now(),
            };

        case 'load':
            return action.invoice;

        case 'reset':
            return emptyInvoice();

        case 'patch-invoice':
            return {
                ...state,
                ...action.patch
            };

        default: {
            const unreachable: never = action;
            return unreachable;
        }
    }
}