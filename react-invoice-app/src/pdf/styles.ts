import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        paddingTop: 36,
        paddingBottom: 36,
        paddingHorizontal: 40,
        fontSize: 10,
        fontFamily: 'Noto Sans',
        color: '#1a1a1a',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    invoiceNumber: {
        fontSize: 14,
        color: '#555',
    },
    partiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    partyBlock: {
        width: '48%',
    },
    partyLabel: {
        fontSize: 9,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    partyName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    partyLine: {
        fontSize: 10,
        color: '#333',
    },
    datesRow: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 18,
    },
    dateBlock: {
        flexDirection: 'column',
    },
    dateLabel: {
        fontSize: 9,
        color: '#888',
        textTransform: 'uppercase',
    },
    dateValue: {
        fontSize: 11,
        marginTop: 2,
    },
    table: {
        marginTop: 8,
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
        paddingBottom: 4,
        marginBottom: 4,
        fontWeight: 'bold',
        fontSize: 9,
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    colDescription: { flex: 3, paddingRight: 8 },
    colQty: { flex: 1, textAlign: 'right', paddingRight: 8 },
    colUnit: { flex: 1.2, textAlign: 'right', paddingRight: 8 },
    colVat: { flex: 0.8, textAlign: 'right', paddingRight: 8 },
    colLineTotal: { flex: 1.4, textAlign: 'right' },
    totalsBox: {
        alignSelf: 'flex-end',
        width: 240,
        marginTop: 12,
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    totalsRowFinal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#1a1a1a',
        fontWeight: 'bold',
        fontSize: 12,
    },
    notes: {
        marginTop: 24,
        paddingTop: 12,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        color: '#555',
        fontSize: 9,
    },
});