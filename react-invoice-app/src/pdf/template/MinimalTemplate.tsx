import { Document, Page, Text, View } from '@react-pdf/renderer';
import type { Invoice, Locale } from '../../domain/types';
import type { TFunction } from '../../i18n/types';
import { formatMoney } from '../../domain/formatMoney';
import { lineTotal, subTotal, total, totalVat } from '../../domain/calculations';
import { styles } from './MinimalTemplate.styles';

interface MinimalTemplateProps {
    readonly invoice: Invoice;
    readonly t: TFunction;
    readonly locale: Locale;
}

export function MinimalTemplate({ invoice, t, locale }: MinimalTemplateProps) {
    const fmt = (amount: number): string =>
        formatMoney(amount, invoice.currency, locale);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.eyebrow}>{t('invoice.number')}</Text>
                <Text style={styles.title}>{invoice.number}</Text>

                <View style={styles.meta}>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>{t('invoice.issueDate')}</Text>
                        <Text style={styles.metaValue}>{invoice.issueDate}</Text>
                    </View>

                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>{t('invoice.dueDate')}</Text>
                        <Text style={styles.metaValue}>{invoice.dueDate}</Text>
                    </View>

                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>
                            {t('invoice.taxableSupplyDate')}
                        </Text>

                        <Text style={styles.metaValue}>
                            {invoice.taxableSupplyDate}
                        </Text>
                    </View>

                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>{t('invoice.currency')}</Text>
                        <Text style={styles.metaValue}>{invoice.currency}</Text>
                    </View>
                </View>

                <View style={styles.parties}>
                    <View style={styles.partyBlock}>
                        <Text style={styles.partyLabel}>{t('invoice.supplier')}</Text>
                        <Text style={styles.partyName}>{invoice.supplier.name}</Text>
                        <Text>{invoice.supplier.address}</Text>

                        {invoice.supplier.taxId ? (
                            <Text>
                                {t('party.taxId')}: {invoice.supplier.taxId}
                            </Text>
                        ) : null}

                        {invoice.supplier.vatId ? (
                            <Text>
                                {t('party.vatId')}: {invoice.supplier.vatId}
                            </Text>
                        ) : null}
                    </View>

                    <View style={styles.partyBlock}>
                        <Text style={styles.partyLabel}>{t('invoice.customer')}</Text>
                        <Text style={styles.partyName}>{invoice.customer.name}</Text>
                        <Text>{invoice.customer.address}</Text>

                        {invoice.customer.taxId ? (
                            <Text>
                                {t('party.taxId')}: {invoice.customer.taxId}
                            </Text>
                        ) : null}

                        {invoice.customer.vatId ? (
                            <Text>
                                {t('party.vatId')}: {invoice.customer.vatId}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <View style={styles.itemsHeader}>
                    <Text style={styles.description}>{t('lineItem.description')}</Text>
                    <Text style={styles.quantity}>{t('lineItem.quantity')}</Text>
                    <Text style={styles.price}>{t('lineItem.unitPrice')}</Text>
                    <Text style={styles.total}>{t('invoice.totals.total')}</Text>
                </View>

                {invoice.items.map((item) => (
                    <View key={item.id} style={styles.itemRow}>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Text style={styles.price}>{fmt(item.unitPrice)}</Text>
                        <Text style={styles.total}>{fmt(lineTotal(item))}</Text>
                    </View>
                ))}

                <View style={styles.totalsBlock}>
                    <View style={styles.totalsRow}>
                        <Text style={styles.totalsLabel}>
                            {t('invoice.totals.subtotal')}
                        </Text>
                        <Text>{fmt(subTotal(invoice.items))}</Text>
                    </View>

                    {invoice.vatMode === 'with-vat' && (
                        <View style={styles.totalsRow}>
                            <Text style={styles.totalsLabel}>
                                {t('invoice.totals.vat')}
                            </Text>

                            <Text>
                                {fmt(totalVat(invoice.items, invoice.vatMode))}
                            </Text>
                        </View>
                    )}

                    <View style={styles.grandTotal}>
                        <Text>{t('invoice.totals.total')}</Text>
                        <Text>
                            {fmt(total(invoice.items, invoice.vatMode))}
                        </Text>
                    </View>
                </View>

                {invoice.note ? (
                    <Text style={styles.notes}>{invoice.note}</Text>
                ) : null}
            </Page>
        </Document>
    );
}