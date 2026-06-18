import { Document, Page, View, Text } from "@react-pdf/renderer";
import type { FC } from "react";
import type { Invoice, Locale } from "../../domain/types";
import type { TFunction } from "../../i18n/types";
import { formatMoney } from "../../domain/formatMoney";
import { lineTotal, subTotal, total, vatBreakdown } from "../../domain/calculations"
import { styles } from "../styles";

interface ClassicTemplateProps {
    invoice: Invoice;
    t: TFunction;
    locale: Locale;
}

export const ClassicTemplate: FC<ClassicTemplateProps> = ({ invoice, t, locale }) => {
    const breakDown = vatBreakdown(invoice.items);
    const fmt = (amount: number): string => formatMoney(amount, invoice.currency, locale);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{t('invoice.number')}</Text>
                    <Text style={styles.invoiceNumber}>{invoice.number}</Text>
                </View>

                <View style={styles.partiesRow}>
                    <View style={styles.partyBlock}>
                        <Text style={styles.partyLabel}>{t('invoice.supplier')}</Text>
                        <Text style={styles.partyName}>{invoice.supplier.name}</Text>
                        <Text style={styles.partyLine}>{invoice.supplier.address}</Text>
                        {invoice.supplier.taxId ? (
                            <Text style={styles.partyLine}>{t('party.taxId')}: {invoice.supplier.taxId}</Text>
                        ) : null}
                        {invoice.supplier.vatId ? (
                            <Text style={styles.partyLine}>{t('party.vatId')}: {invoice.supplier.vatId}</Text>
                        ) : null}
                    </View>
                    <View style={styles.partyBlock}>
                        <Text style={styles.partyLabel}>{t('invoice.customer')}</Text>
                        <Text style={styles.partyName}>{invoice.customer.name}</Text>
                        <Text style={styles.partyLine}>{invoice.customer.address}</Text>
                        {invoice.customer.taxId ? (
                            <Text style={styles.partyLine}>{t('party.taxId')}: {invoice.customer.taxId}</Text>
                        ) : null}
                        {invoice.customer.vatId ? (
                            <Text style={styles.partyLine}>{t('party.vatId')}: {invoice.customer.vatId}</Text>
                        ) : null}
                    </View>
                </View>

                <View style={styles.datesRow}>
                    <View style={styles.dateBlock}>
                        <Text style={styles.dateLabel}>{t('invoice.issueDate')}</Text>
                        <Text style={styles.dateValue}>{invoice.issueDate}</Text>
                    </View>
                    <View style={styles.dateBlock}>
                        <Text style={styles.dateLabel}>{t('invoice.dueDate')}</Text>
                        <Text style={styles.dateValue}>{invoice.dueDate}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDescription}>{t('lineItem.description')}</Text>
                        <Text style={styles.colQty}>{t('lineItem.quantity')}</Text>
                        <Text style={styles.colUnit}>{t('lineItem.unitPrice')}</Text>
                        <Text style={styles.colVat}>{t('lineItem.vatRate')}</Text>
                        <Text style={styles.colLineTotal}>{t('invoice.totals.total')}</Text>
                    </View>
                    {invoice.items.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.colDescription}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colUnit}>{fmt(item.unitPrice)}</Text>
                            <Text style={styles.colVat}>{item.vatRate}%</Text>
                            <Text style={styles.colLineTotal}>{fmt(lineTotal(item))}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totalsBox}>
                    <View style={styles.totalsRow}>
                        <Text>{t('invoice.totals.subtotal')}</Text>
                        <Text>{fmt(subTotal(invoice.items))}</Text>
                    </View>
                    {breakDown.map((row) => (
                        <View key={row.rate} style={styles.totalsRow}>
                            <Text>{t('invoice.totals.vat')} {row.rate}%</Text>
                            <Text>{fmt(row.vat)}</Text>
                        </View>
                    ))}
                    <View style={styles.totalsRowFinal}>
                        <Text>{t('invoice.totals.total')}</Text>
                        <Text>{fmt(total(invoice.items))}</Text>
                    </View>
                </View>

                {invoice.note ? (
                    <View style={styles.notes}>
                        <Text>{t('invoice.notes')}: {invoice.note}</Text>
                    </View>
                ) : null}
            </Page>
        </Document>
    )
}