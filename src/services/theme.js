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
            main: "#899934",
        },
        success: {
            main: "#FFFFFF"
        },
        darkMode: {
            main: "#4a4848",
        },
        lightMode: {
            main: "#FFFFFF"
        },
        purple: {
            main: "#800080"
        },
        brown:{
            main:"#964B00"
        },
        orange:{
            main:"#FFA500"
        }
    },
    direction: "rtl",
    textField: {
        smallTextField: {
            width: '50%', // You can adjust the width to make it smaller
        },
    },
    typography: {
        fontFamily: "inherit",
        h1: {
            fontSize: 32,
            fontWeight: 400
        },
        h2: {
            fontSize: 28,
            fontWeight: 500
        }
    },
});

