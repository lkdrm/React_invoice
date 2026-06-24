import { total } from "../domain/calculations";
import type { Invoice } from "../domain/types";
import { useTranslation } from "../i18n/useTranslation";
import { formatMoney } from "../domain/formatMoney";

interface InvoiceListItemProps {
    invoice: Invoice;
    onOpen: (invoice: Invoice) => void;
    onDuplicate: (invoice: Invoice) => void;
    onDelete: (id: string) => void;
}

export function InvoiceListItem({
    invoice, onOpen, onDuplicate, onDelete,
}: InvoiceListItemProps) {
    const { t, locale } = useTranslation();
    const invoiceTotal = total(invoice.items);
    const customerName = invoice.customer.name || t('history.unnamedCustomer');

    return (
        < li className="invoice-row" >
            <div className="invoice-row__meta">
                <strong>{invoice.number}</strong>
                <span>{customerName}</span>
                <span>{invoice.issueDate}</span>
                <span>{formatMoney(invoiceTotal, invoice.currency, locale)}</span>
            </div>
            <div className="invoice-row__actions">
                <button type="button" onClick={() => onOpen(invoice)}>
                    {t('history.actions.open')}
                </button>
                <button type="button" onClick={() => onDuplicate(invoice)}>
                    {t('history.actions.duplicate')}
                </button>
                <button
                    type="button"
                    className="danger"
                    onClick={() => onDelete(invoice.id)}
                >
                    {t('history.actions.delete')}
                </button>
            </div>
        </li >
    );
};