import type { Party } from '../domain/types';
import { useInvoice } from '../state/InvoiceContext';
import { useTranslation } from '../i18n/useTranslation';
import styles from '../styles/PartyEditor.module.css';

interface PartyEditorProps {
    readonly partyType: 'supplier' | 'customer';
}

export function PartyEditor({ partyType }: PartyEditorProps) {
    const { invoice, dispatch } = useInvoice();
    const { t } = useTranslation();

    const party = invoice[partyType];

    const update = (patch: Partial<Party>) => {
        dispatch({
            type: 'patch-invoice',
            patch: {
                [partyType]: {
                    ...party,
                    ...patch,
                },
                updateAt: Date.now(),
            },
        });
    };

    const label =
        partyType === 'supplier'
            ? t('invoice.supplier')
            : t('invoice.customer');

    return (
        <fieldset className={styles.party}>
            <legend>{label}</legend>

            <label className={styles.field}>
                <span>{t('party.name')}</span>
                <input
                    type="text"
                    value={party.name}
                    onChange={(event) => update({ name: event.target.value })}
                    required
                    placeholder="Company Ltd."
                />
            </label>

            <label className={styles.field}>
                <span>{t('party.address')}</span>
                <textarea
                    value={party.address}
                    onChange={(event) => update({ address: event.target.value })}
                    rows={2}
                    required
                    placeholder="123 Main St, City, Country"
                />
            </label>

            <label className={styles.field}>
                <span>{t('party.taxId')}</span>
                <input
                    type="text"
                    value={party.taxId ?? ''}
                    onChange={(event) => update({ taxId: event.target.value })}
                    required
                    placeholder="123456789"
                />
            </label>

            <label className={styles.field}>
                <span>{t('party.vatId')}</span>
                <input
                    type="text"
                    value={party.vatId ?? ''}
                    onChange={(event) => update({ vatId: event.target.value })}
                    placeholder="VAT123456"
                />
            </label>
        </fieldset>
    );
}