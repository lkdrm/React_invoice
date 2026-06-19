import type { InvoiceTemplate } from './types';
import { ClassicTemplate } from './template/ClassicTemplate';
import { MinimalTemplate } from './template/MinimalTemplate';

const CLASSIC_TEMPLATE_ID = 'classic';
const MINIMAL_TEMPLATE_ID = 'minimal';

export const templates: readonly InvoiceTemplate[] = [
    {
        id: CLASSIC_TEMPLATE_ID,
        displayName: {
            en: 'Classic',
            ua: 'Класичний',
            cz: 'Klasický',
        },
        Component: ClassicTemplate,
    },
    {
        id: MINIMAL_TEMPLATE_ID,
        displayName: {
            en: 'Minimal',
            ua: 'Мінімалістичний',
            cz: 'Minimalistický',
        },
        Component: MinimalTemplate,
    },
];

const DEFAULT_TEMPLATE = templates[0]!;

export function getTemplate(id: string): InvoiceTemplate {
    return templates.find((template) => template.id === id) ?? DEFAULT_TEMPLATE;
}