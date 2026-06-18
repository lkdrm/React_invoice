import type { Invoice } from '../domain/types';

export type InvoiceState = Invoice;

export type {
    Invoice,
} from '../domain/types';

export type InvoiceAction =
    | { type: 'set-field'; field: keyof Invoice; value: unknown }
    | { type: 'set-supplier-field'; field: keyof import('../domain/types').Party; value: string }
    | { type: 'set-customer-field'; field: keyof import('../domain/types').Party; value: string }
    | { type: 'add-item' }
    | { type: 'update-item'; id: string; patch: Partial<import('../domain/types').LineItem> }
    | { type: 'remove-item'; id: string }
    | { type: 'load'; invoice: Invoice }
    | { type: 'reset' }
    | { type: 'patch-invoice'; patch: Partial<Invoice> };