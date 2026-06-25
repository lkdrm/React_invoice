import { useCallback } from 'react';

const PDF_MIME_TYPE = 'application/pdf';
const PDF_EXTENSION = '.pdf';
const ABORT_ERROR_NAME = 'AbortError';

interface FileSaveApi {
    savePdf: (blob: Blob, suggestedName: string) => Promise<void>;
}

export function useFileSave(): FileSaveApi {
    const savePdf = useCallback(async (blob: Blob, suggestedName: string): Promise<void> => {
        const showSaveFilePicker = window.showSaveFilePicker;

        if (typeof showSaveFilePicker === 'function') {
            await saveViaFilePicker(blob, suggestedName, showSaveFilePicker);
            return;
        }
        await saveViaDownloadLink(blob, suggestedName);
    }, []);

    return { savePdf };
}

async function saveViaFilePicker(blob: Blob, suggestedName: string, showSaveFilePicker: NonNullable<Window['showSaveFilePicker']>): Promise<void> {
    try {
        const handle = await showSaveFilePicker({
            suggestedName,
            types: [
                {
                    description: 'PDF',
                    accept: { [PDF_MIME_TYPE]: [PDF_EXTENSION] },
                },
            ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
    } catch (exception) {
        if (exception instanceof DOMException && exception.name === ABORT_ERROR_NAME) {
            return;
        }
        throw exception;
    }
}

async function saveViaDownloadLink(blob: Blob, suggestedName: string): Promise<void> {
    const file = new File([blob], suggestedName, { type: blob.type });

    if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
            files: [file],
            title: suggestedName,
        });
        return;
    }

    const objectUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = suggestedName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
    }, 60_000);
}