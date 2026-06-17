import type { Invoice, LineItem, Party } from "../domain/types";
import { useTranslation } from '../il8n/useTranslation';
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

    const { t, locale } = useTranslation();
    const handleSupplierChange = (party: Party) => update({ supplier: party });
    const handleCustomerChange = (party: Party) => update({ customer: party });
    const handleItemsChange = (items: LineItem[]) => update({ items });

    const sub = subTotal(invoice.items);
    const vat = totalVat(invoice.items);
    const grand = total(invoice.items);

    return (
        <div className={styles.form}>
            <section className={styles.section}>
                <h2>{t('nav.newInvoice')}</h2>
                <div className={styles.grid}>
                    <label className={styles.field}>
                        <span>{t('invoice.number')}</span>
                        <input type="text" value={invoice.number} onChange={(event) => update({ number: event.target.value })} required placeholder="2026-001" />
                    </label>
                    <label className={styles.field}>
                        <span>{t('invoice.currency')}</span>
                        <select value={invoice.currency} onChange={(event) => update({ currency: event.target.value as Invoice['currency'] })}>
                            <option value="EUR">EUR</option>
                            <option value="CZK">CZK</option>
                            <option value="UAH">UAH</option>
                            <option value="USD">USD</option>
                        </select>
                    </label>
                    <label className={styles.field}>
                        <span>{t('invoice.issueDate')}</span>
                        <input type="date" value={invoice.issueDate} onChange={(event) => update({ issueDate: event.target.value })} required />
                    </label>
                    <label className={styles.field}>
                        <span>{t('invoice.dueDate')}</span>
                        <input type="date" value={invoice.dueDate} onChange={(event) => update({ dueDate: event.target.value })} required />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.parties')}</h2>
                <div className={styles.parties}>
                    <PartyEditor label={t('invoice.supplier')} party={invoice.supplier} onChange={handleSupplierChange} />
                    <PartyEditor label={t('invoice.customer')} party={invoice.customer} onChange={handleCustomerChange} />
                </div>
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.items')}</h2>
                <LineItemsEditor items={invoice.items} currency={invoice.currency} onChange={handleItemsChange} />
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.notes')}</h2>
                <label className={styles.field}>
                    <span className={styles.visuallyHidden}>Notes</span>
                    <textarea value={invoice.note ?? ''} onChange={(event) => update({ note: event.target.value })} rows={3} placeholder="Additional notes or comments about the invoice" />
                </label>
            </section>

            <aside className={styles.totals} aria-label="Invoice totals">
                <div>
                    <span>{t('invoice.totals.subtotal')}</span>
                    <strong>{formatMoney(sub, invoice.currency, locale)}</strong>
                </div>
                <div>
                    <span>{t('invoice.totals.vat')}</span>
                    <strong>{formatMoney(vat, invoice.currency, locale)}</strong>
                </div>
                <div className={styles.grand}>
                    <span>{t('invoice.total')}</span>
                    <strong>{formatMoney(grand, invoice.currency, locale)}</strong>
                </div>
            </aside>
        </div>
    );
};