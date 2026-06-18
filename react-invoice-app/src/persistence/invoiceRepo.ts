import type { Invoice } from "../domain/types";
import type { Repository } from '../persistence/types';
import { loadCollection, saveCollection } from "./storage";

const INVOICES_KEY = 'invoices.v1';

function list(): Invoice[] {
    return loadCollection<Invoice>(INVOICES_KEY);
}

function get(id: string): Invoice | undefined {
    return list().find(invoice => invoice.id == id);
}

function save(item: Invoice): void {
    const current = list();
    const index = current.findIndex(invoice => invoice.id == item.id);
    if (index >= 0) {
        current[index] = item;
    } else {
        current.push(item);
    }
    saveCollection(INVOICES_KEY, current);
}

function remove(id: string): void {
    const current = list();
    const next = current.filter(invoice => invoice.id !== id);
    saveCollection(INVOICES_KEY, next);
}

export const invoiceRepo: Repository<Invoice> = {
    list, get, save, delete: remove
}