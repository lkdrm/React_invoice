import { Font } from '@react-pdf/renderer';

const fontsBaseUrl = `${import.meta.env.BASE_URL}fonts/`;

Font.register({
    family: 'Noto Sans',
    fonts: [
        {
            src: `${fontsBaseUrl}NotoSans-Regular.ttf`,
            fontWeight: 'normal',
        },
        {
            src: `${fontsBaseUrl}NotoSans-Bold.ttf`,
            fontWeight: 'bold',
        },
    ],
});