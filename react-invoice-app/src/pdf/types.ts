import type { ComponentType } from 'react';
import type { Invoice, Locale } from '../domain/types';
import type { TFunction } from '../i18n/types';

export interface PdfTemplateProps {
    readonly invoice: Invoice;
    readonly t: TFunction;
    readonly locale: Locale;
}

export interface InvoiceTemplate {
    readonly id: string;
    readonly displayName: Record<Locale, string>;
    readonly Component: ComponentType<PdfTemplateProps>;
}