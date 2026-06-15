export type Locale = 'en' | 'uk';
export type Money = number;
export type ISODate = string; // ISO 8601 format: YYYY-MM-DD
export type Currency = 'USD' | 'EUR' | 'UAH' | 'CZK';

export interface Party {
    name: string;
    address: string;
    taxId: string;
    vatId: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: Money;
    vatRate: number; // VAT rate as a percentage, e.g., 20 for 20%
}

export interface Invoice {
    id: string;
    number: string;
    issueDate: ISODate;
    dueDate: ISODate;
    supplier: Party;
    customer: Party;
    items: LineItem[];
    currency: Currency;
    templateId: string;
    note?: string;
    createAt: number; // Unix timestamp
    updateAt: number; // Unix timestamp
}

export interface Settings {
    locale: Locale;
    defaultSupplier: Party;
    defaultCurrency: Currency;
    defaultVatRate: number; // Default VAT rate as a percentage, e.g., 20 for 20%
    invoiceTemplateId: string;
    invoiceNumberPrefix: string;
}