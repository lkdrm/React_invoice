import { useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { SettingsContext } from './SettingsContext';
import type { Settings } from '../domain/types';
import { settingsRepo } from '../persistence/settingsRepo';

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => settingsRepo.load());

    const updateSettings = (patch: Partial<Settings>) => {
        setSettings(current => {
            const next = { ...current, ...patch };
            settingsRepo.save(next);
            return next;
        });
    };

    const value = useMemo(
        () => ({ settings, updateSettings }),
        [settings]
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};