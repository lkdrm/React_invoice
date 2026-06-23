import type { Party } from '../domain/types';
import { useTranslation } from '../i18n/useTranslation';
import styles from '../styles/PartyEditor.module.css';

interface PartyEditorProps {
    readonly party: Party;
    readonly onChange: (party: Party) => void;
    readonly label?: string;
}

export function PartyEditor({ party, onChange, label }: PartyEditorProps) {
    const { t } = useTranslation();

    const update = (patch: Partial<Party>) => {
        onChange({
            ...party,
            ...patch,
        });
    };

    return (
        <fieldset className={styles.party}>
            {label && <legend>{label}</legend>}

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