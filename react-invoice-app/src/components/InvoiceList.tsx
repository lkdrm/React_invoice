import type { Invoice } from "../domain/types";
import { InvoiceListItem } from "./InvoiceListItem";

interface InvoiceListProps {
    invoices: Invoice[];
    onOpen: (invoice: Invoice) => void;
    onDuplicate: (invoice: Invoice) => void;
    onDelete: (id: string) => void;
}

export function InvoiceList({
    invoices, onOpen, onDuplicate, onDelete
}: InvoiceListProps) {
    return (
        <ul className="invoice-list">
            {invoices.map((invoice) => (
                <InvoiceListItem
                    key={invoice.id}
                    invoice={invoice}
                    onOpen={onOpen}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}