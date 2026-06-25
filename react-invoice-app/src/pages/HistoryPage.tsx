import { useMemo, useState } from 'react';
import type { Invoice } from '../domain/types';
import { invoiceRepo } from '../persistence/invoiceRepo';
import { useTranslation } from '../i18n/useTranslation';
import { nextInvoiceNumber } from '../domain/numbering';
import { useSettings } from '../state/useSettings';
import styles from '../styles/HistoryPage.module.css';

interface HistoryPageProps {
    onOpenInvoice: (invoice: Invoice) => void;
}

export function HistoryPage({ onOpenInvoice, }: HistoryPageProps) {
    const { t } = useTranslation();
    const { settings } = useSettings();

    const [invoices, setInvoices] = useState<Invoice[]>(() => invoiceRepo.list());
    const [search, setSearch] = useState('');

    const reload = () => {
        setInvoices(invoiceRepo.list());
    };

    const filteredInvoices = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (normalizedSearch === '') {
            return invoices;
        }

        return invoices.filter((invoice) => {
            const invoiceNumber = invoice.number.toLowerCase();
            const customerName = invoice.customer.name.toLowerCase();

            return (
                invoiceNumber.includes(normalizedSearch) ||
                customerName.includes(normalizedSearch)
            );
        });
    }, [invoices, search]);

    const handleOpen = (invoice: Invoice): void => {
        onOpenInvoice(invoice);
    };

    const handleDuplicate = (invoice: Invoice): void => {
        const now = Date.now();
        const duplicate: Invoice = {
            ...invoice,
            id: crypto.randomUUID(),
            number: nextInvoiceNumber(settings.invoiceNumberPrefix),
            supplier: { ...invoice.supplier },
            customer: { ...invoice.customer },
            items: invoice.items.map((item) => ({ ...item })),
            createAt: now,
            updateAt: now,
        };
        onOpenInvoice(duplicate);
    };

    const handleDelete = (invoiceId: string) => {
        const confirmed = window.confirm(t('history.deleteConfirm'));

        if (!confirmed) {
            return;
        }

        invoiceRepo.delete(invoiceId);
        reload();
    };

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <h2>{t('history.title')}</h2>

                <input
                    type="search"
                    value={search}
                    placeholder={t('history.searchPlaceholder')}
                    onChange={(event) => setSearch(event.target.value)}
                    className={styles.search}
                />
            </div>

            {invoices.length === 0 && (
                <p className={styles.message}>{t('history.empty')}</p>
            )}

            {invoices.length > 0 && filteredInvoices.length === 0 && (
                <p className={styles.message}>{t('history.noMatches')}</p>
            )}

            {filteredInvoices.length > 0 && (
                <div className={styles.list}>
                    {filteredInvoices.map((invoice) => (
                        <article key={invoice.id} className={styles.card}>
                            <div className={styles.invoiceInfo}>
                                <strong>
                                    {invoice.number || t('history.unnamedInvoice')}
                                </strong>

                                <span>
                                    {invoice.customer.name || t('history.unnamedCustomer')}
                                </span>
                            </div>

                            <time className={styles.date} dateTime={invoice.issueDate}>
                                {new Date(invoice.issueDate).toLocaleDateString()}
                            </time>

                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    onClick={() => handleOpen(invoice)}
                                >
                                    {t('history.actions.open')}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDuplicate(invoice)}
                                >
                                    {t('history.actions.duplicate')}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(invoice.id)}
                                >
                                    {t('history.actions.delete')}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
