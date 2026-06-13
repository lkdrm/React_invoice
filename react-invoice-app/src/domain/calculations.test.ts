import { describe, it, expect } from 'vitest';
import type { LineItem } from './types';
import {
  formatMoney,
  lineTotal,
  lineVat,
  subTotal,
  total,
  totalVat,
  vatBreakdown,
} from './calculations';

function buildItem(overrides: Partial<LineItem> = {}): LineItem {
  return {
    id: 'test-id',
    description: 'Test',
    quantity: 1,
    unitPrice: 10000,
    vatRate: 21,
    ...overrides,
  };
}

describe('calculations', () => {
  describe('with an empty item list', () => {
    it('returns zero for every total', () => {
      expect(subTotal([])).toBe(0);
      expect(totalVat([])).toBe(0);
      expect(total([])).toBe(0);
      expect(vatBreakdown([])).toEqual([]);
    });
  });

  describe('with a single item', () => {
    it('computes line total and VAT in minor units', () => {
      const item = buildItem({ quantity: 2, unitPrice: 5000, vatRate: 21 });

      expect(lineTotal(item)).toBe(10000);
      expect(lineVat(item)).toBe(2100);
      expect(total([item])).toBe(12100);
    });
  });

  describe('with multiple items at the same VAT rate', () => {
    it('sums subtotal, VAT, and total', () => {
      const items = [
        buildItem({ id: 'a', quantity: 1, unitPrice: 10000, vatRate: 21 }),
        buildItem({ id: 'b', quantity: 3, unitPrice: 2000, vatRate: 21 }),
      ];

      expect(subTotal(items)).toBe(16000);
      expect(totalVat(items)).toBe(3360);
      expect(total(items)).toBe(19360);
    });
  });

  describe('with mixed VAT rates', () => {
    it('groups by rate and returns ascending order', () => {
      const items = [
        buildItem({ id: 'a', quantity: 1, unitPrice: 10000, vatRate: 21 }),
        buildItem({ id: 'b', quantity: 1, unitPrice: 5000, vatRate: 10 }),
        buildItem({ id: 'c', quantity: 2, unitPrice: 1000, vatRate: 21 }),
        buildItem({ id: 'd', quantity: 1, unitPrice: 4000, vatRate: 0 }),
      ];

      const breakdown = vatBreakdown(items);

      expect(breakdown).toEqual([
        { rate: 0, base: 4000, vat: 0 },
        { rate: 10, base: 5000, vat: 500 },
        { rate: 21, base: 12000, vat: 2520 },
      ]);
    });
  });

  describe('rounding edge case', () => {
    it('rounds VAT to the nearest minor unit', () => {
      const item = buildItem({ quantity: 3, unitPrice: 333, vatRate: 21 });

      expect(lineTotal(item)).toBe(999);
      expect(lineVat(item)).toBe(210);
    });
  });

  describe('formatMoney', () => {
    it('formats CZK amounts for English locale', () => {
      const formatted = formatMoney(123456, 'CZK', 'en');

      expect(formatted).toMatch(/1,234\.56/);
      expect(formatted).toMatch(/CZK|Kč/);
    });

    it('formats UAH amounts for Ukrainian locale', () => {
      const formatted = formatMoney(123456, 'UAH', 'uk');

      expect(formatted).toContain('1');
      expect(formatted).toContain('234');
      expect(formatted).toMatch(/₴|UAH/);
    });
  });
});