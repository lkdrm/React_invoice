import type { LineItem } from '../domain/types';
import { useInvoice } from '../state/InvoiceContext';
import { lineTotal } from '../domain/calculations';
import { formatMoney } from '../domain/formatMoney';
import { parseMoneyInput, formatMoneyInput } from '../domain/money';
import { emptyLineItem } from '../domain/factory';
import { useTranslation } from '../i18n/useTranslation';
import { useSettings } from '../state/useSettings';
import styles from '../styles/LineItemsEditor.module.css';

const VAT_OPTIONS = [0, 10, 15, 21] as const;

export function LineItemsEditor() {
    const { invoice, dispatch } = useInvoice();
    const { t, locale } = useTranslation();
    const { settings } = useSettings();
    const items = invoice.items;
    const currency = invoice.currency;
    const isVatEnabled = invoice.vatMode === 'with-vat';

    const updateItems = (nextItems: LineItem[], updateAt: number): void => {
        dispatch({
            type: 'patch-invoice',
            patch: {
                items: nextItems,
                updateAt,
            },
        });
    };

    const updateItem = (
        id: string,
        patch: Partial<LineItem>,
        updateAt: number,
    ): void => {
        updateItems(
            items.map((item) =>
                item.id === id ? { ...item, ...patch } : item,
            ),
            updateAt,
        );
    };

    const addItem = (updateAt: number): void => {
        updateItems(
            [
                ...items,
                emptyLineItem(settings.defaultVatRate ?? 21),
            ],
            updateAt,
        );
    };

    const removeItem = (id: string, updateAt: number): void => {
        updateItems(
            items.filter((item) => item.id !== id),
            updateAt,
        );
    };

    return (
        <div className={styles.editor}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{t('lineItem.description')}</th>
                        <th>{t('lineItem.quantity')}</th>
                        <th>{t('lineItem.unitPrice')}</th>

                        {isVatEnabled ? (
                            <th>{t('lineItem.vatRate')}</th>
                        ) : null}

                        <th>{t('lineItem.total')}</th>
                        <th aria-label="Actions" />
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td
                                className={styles.descriptionCell}
                                data-label={t('lineItem.description')}
                            >
                                <input
                                    type="text"
                                    value={item.description}
                                    onChange={(event) =>
                                        updateItem(
                                            item.id,
                                            { description: event.target.value },
                                            Date.now(),
                                        )
                                    }
                                    required
                                    placeholder="Item description"
                                />
                            </td>

                            <td
                                className={styles.quantityCell}
                                data-label={t('lineItem.quantity')}
                            >
                                <input
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={item.quantity}
                                    onChange={(event) =>
                                        updateItem(
                                            item.id,
                                            { quantity: Number(event.target.value) },
                                            Date.now(),
                                        )
                                    }
                                    required
                                    placeholder="Quantity"
                                />
                            </td>

                            <td
                                className={styles.unitPriceCell}
                                data-label={t('lineItem.unitPrice')}
                            >
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={formatMoneyInput(item.unitPrice)}
                                    onChange={(event) =>
                                        updateItem(
                                            item.id,
                                            {
                                                unitPrice: parseMoneyInput(
                                                    event.target.value,
                                                ),
                                            },
                                            Date.now(),
                                        )
                                    }
                                    required
                                    placeholder="Unit price"
                                />
                            </td>

                            {isVatEnabled ? (
                                <td
                                    className={styles.vatCell}
                                    data-label={t('lineItem.vatRate')}
                                >
                                    <select
                                        value={item.vatRate}
                                        onChange={(event) =>
                                            updateItem(
                                                item.id,
                                                {
                                                    vatRate: Number(
                                                        event.target.value,
                                                    ),
                                                },
                                                Date.now(),
                                            )
                                        }
                                    >
                                        {VAT_OPTIONS.map((rate) => (
                                            <option key={rate} value={rate}>
                                                {rate} %
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            ) : null}

                            <td
                                className={styles.lineTotal}
                                data-label={t('lineItem.total')}
                            >
                                {formatMoney(
                                    lineTotal(item),
                                    currency,
                                    locale,
                                )}
                            </td>

                            <td className={styles.actionsCell}>
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() =>
                                        removeItem(item.id, Date.now())
                                    }
                                    disabled={items.length === 1}
                                    aria-label="Remove row"
                                >
                                    {t('lineItem.remove')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                type="button"
                className={styles.addButton}
                onClick={() => addItem(Date.now())}
            >
                {t('lineItem.add')}
            </button>
        </div>
    );
}