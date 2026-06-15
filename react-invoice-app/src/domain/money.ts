import type { Money } from './types';

const MINOR_UNITS_PER_MAJOR = 100;

export const parseMoneyInput = (text: string): Money => {
    if (text === '' || text === null || text === undefined) {
        return 0;
    }
    const normalised = text.replace(',', '.').trim();
    const major = Number.parseFloat(normalised);
    if (Number.isNaN(major)) {
        return 0;
    }
    return Math.round(major * MINOR_UNITS_PER_MAJOR);
};

export const formatMoneyInput = (amount: Money): string => {
    const major = amount / MINOR_UNITS_PER_MAJOR;
    return major.toFixed(2);
};