import type { Invoice } from '../domain/types';
import type { SyntheticEvent } from 'react';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import { subTotal, total, totalVat } from '../domain/calculations';
import { formatMoney } from '../domain/formatMoney';
import { PartyEditor } from './PartyEditor';
import { LineItemsEditor } from './LineItemsEditor';
import styles from '../styles/InvoiceForm.module.css';

export function InvoiceForm() {
    const { invoice, dispatch } = useInvoice();
    const { t, locale } = useTranslation();

    const update = (patch: Partial<Invoice>) => {
        dispatch({
            type: 'patch-invoice',
            patch: {
                ...patch,
                updateAt: Date.now(),
            },
        });
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Submit invoice:', invoice);
    };

    const sub = subTotal(invoice.items);
    const vat = totalVat(invoice.items);
    const grand = total(invoice.items);

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
            <section className={styles.section}>
                <h2>{t('nav.newInvoice')}</h2>

                <div className={styles.grid}>
                    <label className={styles.field}>
                        <span>{t('invoice.number')}</span>
                        <input
                            type="text"
                            value={invoice.number}
                            onChange={(event) => update({ number: event.target.value })}
                            required
                            placeholder="2026-001"
                        />
                    </label>

                    <label className={styles.field}>
                        <span>{t('invoice.currency')}</span>
                        <select
                            value={invoice.currency}
                            onChange={(event) =>
                                update({
                                    currency: event.target.value as Invoice['currency'],
                                })
                            }
                        >
                            <option value="EUR">EUR</option>
                            <option value="CZK">CZK</option>
                            <option value="UAH">UAH</option>
                            <option value="USD">USD</option>
                        </select>
                    </label>

                    <label className={styles.field}>
                        <span>{t('invoice.issueDate')}</span>
                        <input
                            type="date"
                            value={invoice.issueDate}
                            onChange={(event) => update({ issueDate: event.target.value })}
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        <span>{t('invoice.dueDate')}</span>
                        <input
                            type="date"
                            value={invoice.dueDate}
                            onChange={(event) => update({ dueDate: event.target.value })}
                            required
                        />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.parties')}</h2>

                <div className={styles.parties}>
                    <PartyEditor partyType="supplier" />
                    <PartyEditor partyType="customer" />
                </div>
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.items')}</h2>

                <LineItemsEditor />
            </section>

            <section className={styles.section}>
                <h2>{t('invoice.notes')}</h2>

                <label className={styles.field}>
                    <span className={styles.visuallyHidden}>Notes</span>
                    <textarea
                        value={invoice.note ?? ''}
                        onChange={(event) => update({ note: event.target.value })}
                        rows={3}
                        placeholder="Additional notes or comments about the invoice"
                    />
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

            <button type="submit">
                {t('actions.save')}
            </button>
        </form>
    );
}