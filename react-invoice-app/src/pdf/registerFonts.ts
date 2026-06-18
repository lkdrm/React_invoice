import { Font } from '@react-pdf/renderer';

Font.register({
    family: 'Noto Sans',
    fonts: [
        {
            src: '/fonts/NotoSans-Regular.ttf',
            fontWeight: 'normal',
        },
        {
            src: '/fonts/NotoSans-Bold.ttf',
            fontWeight: 'bold',
        },
    ],
});