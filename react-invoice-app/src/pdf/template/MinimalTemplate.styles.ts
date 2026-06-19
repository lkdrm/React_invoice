import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 70,
        fontSize: 11,
        fontFamily: 'Noto Sans',
        color: '#1a1a1a',
        lineHeight: 1.5,
    },

    eyebrow: {
        fontSize: 9,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#888',
        marginBottom: 4,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 28,
    },

    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 36,
    },

    metaBlock: {
        flexDirection: 'column',
    },

    metaLabel: {
        fontSize: 8,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#888',
        marginBottom: 2,
    },

    metaValue: {
        fontSize: 11,
    },

    parties: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 36,
    },

    partyBlock: {
        flexDirection: 'column',
        width: '45%',
    },

    partyLabel: {
        fontSize: 8,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#888',
        marginBottom: 6,
    },

    partyName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },

    itemsHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
        paddingBottom: 6,
        marginBottom: 8,
        fontSize: 8,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#888',
    },

    itemRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },

    description: {
        flex: 5,
    },

    quantity: {
        flex: 1,
        textAlign: 'right',
    },

    price: {
        flex: 1.5,
        textAlign: 'right',
    },

    total: {
        flex: 1.5,
        textAlign: 'right',
    },

    totalsBlock: {
        marginTop: 32,
        alignSelf: 'flex-end',
        width: '40%',
    },

    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },

    totalsLabel: {
        color: '#888',
    },

    grandTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#1a1a1a',
        fontSize: 14,
        fontWeight: 'bold',
    },

    notes: {
        marginTop: 48,
        fontSize: 10,
        color: '#555',
    },
});