import { invoiceRepo } from "../persistence/invoiceRepo";

export function nextInvoiceNumber(prefix: string): string {
    const count = invoiceRepo.list().length + 1;
    const padded = count.toString().padStart(3, '0');

    return `${prefix}${padded}`;
}