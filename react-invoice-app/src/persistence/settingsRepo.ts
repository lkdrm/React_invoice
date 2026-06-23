import type { Settings } from "../domain/types";
import { loadObject, saveObject } from "./storage";

const SETTINGS_KEY = 'settings.v1'

export function defaulSettings(): Settings {
    return {
        locale: 'en',
        defaultSupplier: {
            name: '',
            address: '',
            taxId: '',
            vatId: '',
        },
        defaultCurrency: 'CZK',
        defaultVatRate: 21,
        invoiceTemplateId: 'classic',
        invoiceNumberPrefix: '2026-',
        theme: 'light'
    };
}

function load(): Settings {
    return loadObject<Settings>(SETTINGS_KEY, defaulSettings());
}

function save(settings: Settings): void {
    saveObject(SETTINGS_KEY, settings);
}

export const settingsRepo = {
    load, save
}