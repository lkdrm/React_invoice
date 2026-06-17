import type { Currency, LineItem } from '../domain/types';
import { lineTotal } from '../domain/calculations';
import { formatMoney } from '../domain/formatMoney';
import { parseMoneyInput, formatMoneyInput } from '../domain/money';
import { emptyLineItem } from '../domain/factory';
import { useTranslation } from '../il8n/useTranslation';
import styles from '../styles/LineItemsEditor.module.css';

interface LineItemsEditorProps {
    items: LineItem[];
    currency: Currency;
    onChange: (next: LineItem[]) => void;
}

const VAT_OPTIONS = [0, 10, 15, 21] as const;

export const LineItemsEditor = ({ items, currency, onChange }: LineItemsEditorProps) => {
    const updateItem = (id: string, patch: Partial<LineItem>) => {
        onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    };

    const addItem = () => {
        onChange([...items, emptyLineItem()]);
    };

    const removeItem = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const { t } = useTranslation();

    return (
        <div className={styles.editor}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{t('lineItem.description')}</th>
                        <th>{t('lineItem.quantity')}</th>
                        <th>{t('lineItem.unitPrice')}</th>
                        <th>{t('lineItem.vatRate')}</th>
                        <th aria-label="Actions" />
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input type="text" value={item.description} onChange={(event) => updateItem(item.id, { description: event.target.value })} required placeholder="Item description" />
                            </td>
                            <td>
                                <input type="number" min={0} step="0.01" value={item.quantity} onChange={(event) => updateItem(item.id, { quantity: Number(event.target.value) })} required placeholder="Quantity" />
                            </td>
                            <td>
                                <input type="text" inputMode="decimal" value={formatMoneyInput(item.unitPrice)} onChange={(event) => updateItem(item.id, { unitPrice: parseMoneyInput(event.target.value) })} required placeholder="Unit price" />
                            </td>
                            <td>
                                <select value={item.vatRate} onChange={(event) => updateItem(item.id, { vatRate: Number(event.target.value) })}>
                                    {
                                        VAT_OPTIONS.map((rate) =>
                                        (
                                            <option
                                                key={rate} value={rate}>{rate}
                                            </option>
                                        ))}
                                </select>
                            </td>
                            <td className={styles.lineTotal}>
                                {formatMoney(lineTotal(item), currency, 'en')}
                            </td>
                            <td>
                                <button type="button" onClick={() => removeItem(item.id)} disabled={items.length === 1} aria-label="Remove row">
                                    {t('lineItem.remove')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className={styles.addButton} onClick={addItem}>
                {t('lineItem.add')}
            </button>
        </div>
    );
};