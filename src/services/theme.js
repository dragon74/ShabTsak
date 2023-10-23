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
         //green
        primary: {
            main: "#355E3B",
        },
        //blue
        secondary: {
            main: "#4169e1",
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
            main: "#FFFFFF"
        }
    },
    direction: "rtl"
});

