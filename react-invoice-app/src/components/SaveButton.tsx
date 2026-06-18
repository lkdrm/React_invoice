import { useInvoice } from "../state/InvoiceContext";
import { useTranslation } from "../i18n/useTranslation";
import { invoiceRepo } from "../persistence/invoiceRepo";

export function SaveButton() {
    const { invoice, dispatch } = useInvoice();
    const { t } = useTranslation();

    function handleSave() {
        const now = Date.now();
        dispatch({ type: 'set-field', field: 'updateAt', value: now });
        invoiceRepo.save({ ...invoice, updateAt: now });
    }

    return (
        <button type="button" onClick={handleSave}>
            {t('form.save')}
        </button>
    )
}