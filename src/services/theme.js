import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

// Create rtl cache
export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export const theme = createTheme({
    palette: {
        primary: {
            main: "#355E3B",
        },
        secondary: {
            main: "#C12FFF",
        },
        danger: {
            main: "purple[300]",
        },
        success: {
            main: "#FFFFFF"
        },
        darkMode: {
            main: "#4a4848"
        },
        lightMode: {
            main: "#FFGFFF"
        },

    },
    direction: "rtl"
});

