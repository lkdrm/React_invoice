// useSettings.ts
import { useContext } from 'react';
import { SettingsContext } from '../state/SettingsContext';

export function useSettings() {
    const value = useContext(SettingsContext);

    if (value === null) {
        throw new Error('useSettings must be used within <SettingsProvider>');
    }

    return value;
}