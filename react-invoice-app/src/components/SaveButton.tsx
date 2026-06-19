import { useInvoice } from "../state/InvoiceContext";
import { useTranslation } from "../i18n/useTranslation";
import { invoiceRepo } from "../persistence/invoiceRepo";
import styles from '../styles/SaveButton.module.css';

export function SaveButton() {
    const { invoice, dispatch } = useInvoice();
    const { t } = useTranslation();

    function handleSave() {
        const now = Date.now();
        dispatch({ type: 'set-field', field: 'updateAt', value: now });
        invoiceRepo.save({ ...invoice, updateAt: now });
    }

    return (
        <button type="button" className={styles.saveButton} onClick={handleSave}>
            {t('form.save')}
        </button>
    )
}