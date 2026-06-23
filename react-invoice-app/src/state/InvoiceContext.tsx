import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    type ReactNode,
    type Dispatch,
} from 'react';
import type { Invoice } from '../domain/types';
import type { InvoiceAction } from './types';
import { invoiceReducer, emptyInvoice } from './invoiceReducer';

interface InvoiceContextValue {
    invoice: Invoice;
    dispatch: Dispatch<InvoiceAction>;
}

const InvoiceContext = createContext<InvoiceContextValue | null>(null);

interface InvoiceProviderProps {
    readonly children: ReactNode;
    readonly initialInvoice?: Invoice;
}

export function InvoiceProvider({ children, initialInvoice }: InvoiceProviderProps) {
    const [invoice, dispatch] = useReducer(
        invoiceReducer,
        initialInvoice ?? null,
        (value) => value ?? emptyInvoice()
    );

    const value = useMemo<InvoiceContextValue>(
        () => ({ invoice, dispatch }),
        [invoice]
    );

    return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInvoice(): InvoiceContextValue {
    const context = useContext(InvoiceContext);
    if (context === null) {
        throw new Error('useInvoice must be used inside an <InvoiceProvider>');
    }
    return context;
}