import type { Invoice, LineItem, Party } from "../domain/types";
import { subTotal, total, totalVat } from "../domain/calculations";
import { formatMoney } from "../domain/formatMoney";
import { PartyEditor } from "../components/PartyEditor";
import { LineItemsEditor } from "../components/LineItemsEditor";
import styles from '../styles/InvoiceForm.module.css';

interface InvoiceFormProps {
    invoice: Invoice;
    onChange: (next: Invoice) => void;
}

export const InvoiceForm = ({ invoice, onChange }: InvoiceFormProps) => {
    const update = (patch: Partial<Invoice>) => {
        onChange({ ...invoice, ...patch, updateAt: Date.now() });
    };

    const handleSupplierChange = (party: Party) => update({ supplier: party });
    const handleCustomerChange = (party: Party) => update({ customer: party });
    const handleItemsChange = (items: LineItem[]) => update({ items });

    const sub = subTotal(invoice.items);
    const vat = totalVat(invoice.items);
    const grand = total(invoice.items);

    return (
        <div className={styles.form}>
            <section className={styles.section}>
                <h2>Invoice details</h2>
                <div className={styles.grid}>
                    <label className={styles.field}>
                        <span>Invoice number</span>
                        <input type="text" value={invoice.number} onChange={(event) => update({ number: event.target.value })} required placeholder="2026-001" />
                    </label>
                    <label className={styles.field}>
                        <span>Currency</span>
                        <select value={invoice.currency} onChange={(event) => update({ currency: event.target.value as Invoice['currency'] })}>
                            <option value="EUR">EUR</option>
                            <option value="CZK">CZK</option>
                            <option value="UAH">UAH</option>
                            <option value="USD">USD</option>
                        </select>
                    </label>
                    <label className={styles.field}>
                        <span>Issue date</span>
                        <input type="date" value={invoice.issueDate} onChange={(event) => update({ issueDate: event.target.value })} required />
                    </label>
                    <label className={styles.field}>
                        <span>Due date</span>
                        <input type="date" value={invoice.dueDate} onChange={(event) => update({ dueDate: event.target.value })} required />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Parties</h2>
                <div className={styles.parties}>
                    <PartyEditor label="Supplier" party={invoice.supplier} onChange={handleSupplierChange} />
                    <PartyEditor label="Customer" party={invoice.customer} onChange={handleCustomerChange} />
                </div>
            </section>

            <section className={styles.section}>
                <h2>Line items</h2>
                <LineItemsEditor items={invoice.items} currency={invoice.currency} onChange={handleItemsChange} />
            </section>

            <section className={styles.section}>
                <h2>Notes</h2>
                <label className={styles.field}>
                    <span className={styles.visuallyHidden}>Notes</span>
                    <textarea value={invoice.note ?? ''} onChange={(event) => update({ note: event.target.value })} rows={3} placeholder="Additional notes or comments about the invoice" />
                </label>
            </section>

            <aside className={styles.totals} aria-label="Invoice totals">
                <div>
                    <span>Subtotal:</span>
                    <strong>{formatMoney(sub, invoice.currency, 'en')}</strong>
                </div>
                <div>
                    <span>VAT:</span>
                    <strong>{formatMoney(vat, invoice.currency, 'en')}</strong>
                </div>
                <div className={styles.grand}>
                    <span>Total:</span>
                    <strong>{formatMoney(grand, invoice.currency, 'en')}</strong>
                </div>
            </aside>
        </div>
    );
};