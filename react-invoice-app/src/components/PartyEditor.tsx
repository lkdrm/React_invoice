import type { Party } from '../domain/types';
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

    return (
        <fieldset className={styles.party}>
            <legend>{label}</legend>
            <label className={styles.field}>
                <span>Name</span>
                <input type="text" value={party.name} onChange={(event) => update({ name: event.target.value })} required placeholder="Company Ltd." />
            </label>
            <label className={styles.field}>
                <span>Address</span>
                <textarea value={party.address} onChange={(event) => update({ address: event.target.value })} rows={2} required placeholder="123 Main St, City, Country" />
            </label>
            <label className={styles.field}>
                <span>Tax ID</span>
                <input type="text" value={party.taxId ?? ''} onChange={(event) => update({ taxId: event.target.value })} required placeholder="123456789" />
            </label>
            <label className={styles.field}>
                <span>VAT ID</span>
                <input type="text" value={party.vatId ?? ''} onChange={(event) => update({ vatId: event.target.value })} placeholder="VAT123456" />
            </label>
        </fieldset>
    );
};