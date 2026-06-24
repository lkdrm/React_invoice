import type { LineItem, Money, VatMode } from './types';

const PERCENT_DIVISOR = 100;

export function lineTotal(item: LineItem): Money {
    return Math.round(item.quantity * item.unitPrice);
}

export function lineVat(item: LineItem): Money {
    return Math.round(
        (lineTotal(item) * item.vatRate) / PERCENT_DIVISOR
    );
}

export function subTotal(items: readonly LineItem[]): Money {
    return items.reduce(
        (sum, item) => sum + lineTotal(item),
        0
    );
}

export function totalVat(
    items: readonly LineItem[],
    vatMode: VatMode = 'with-vat',
): Money {
    if (vatMode === 'without-vat') {
        return 0;
    }

    return items.reduce(
        (sum, item) => sum + lineVat(item),
        0
    );
}

export function total(
    items: readonly LineItem[],
    vatMode: VatMode = 'with-vat',
): Money {
    return subTotal(items) + totalVat(items, vatMode);
}

export interface VatGroup {
    rate: number;
    base: Money;
    vat: Money;
}

export function vatBreakdown(
    items: readonly LineItem[],
    vatMode: VatMode = 'with-vat',
): VatGroup[] {
    if (vatMode === 'without-vat') {
        return [];
    }

    const byRate = new Map<number, VatGroup>();

    for (const item of items) {
        const rate = item.vatRate;
        const existing = byRate.get(rate);

        const itemBase = lineTotal(item);
        const itemVat = lineVat(item);

        if (existing) {
            existing.base += itemBase;
            existing.vat += itemVat;
        } else {
            byRate.set(rate, {
                rate,
                base: itemBase,
                vat: itemVat,
            });
        }
    }

    return [...byRate.values()].sort(
        (first, second) => first.rate - second.rate
    );
}