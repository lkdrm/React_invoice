import type { Party } from '../domain/types';
import { useTranslation } from '../il8n/useTranslation';
import styles from '../styles/PartyEditor.module.css';

interface PartyEditorProps {
    label: string;
    party: Party;
    onChange: (next: Party) => void;
}

export const PartyEditor = ({ label, party, onChange }: PartyEditorProps) => {
    const update = (patch: Partial<Party>) => {
        onChange({ ...party, ...patch });
    };

    const { t } = useTranslation();

    return (
        <fieldset className={styles.party}>
            <legend>{label}</legend>
            <label className={styles.field}>
                <span>{t('party.name')}</span>
                <input type="text" value={party.name} onChange={(event) => update({ name: event.target.value })} required placeholder="Company Ltd." />
            </label>
            <label className={styles.field}>
                <span>{t('party.address')}</span>
                <textarea value={party.address} onChange={(event) => update({ address: event.target.value })} rows={2} required placeholder="123 Main St, City, Country" />
            </label>
            <label className={styles.field}>
                <span>{t('party.taxId')}</span>
                <input type="text" value={party.taxId ?? ''} onChange={(event) => update({ taxId: event.target.value })} required placeholder="123456789" />
            </label>
            <label className={styles.field}>
                <span>{t('party.vatId')}</span>
                <input type="text" value={party.vatId ?? ''} onChange={(event) => update({ vatId: event.target.value })} placeholder="VAT123456" />
            </label>
        </fieldset>
    );
};