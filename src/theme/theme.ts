import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

// Create rtl cache
export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export const theme = responsiveFontSizes(createTheme({
    typography: {
        fontFamily: 'inherit',
        h1: {
            fontSize: 32,
            fontWeight: 400,
        },
        h2: {
            fontSize: '3rem',
            '@media (min-width:600px)': {
                fontSize: '4rem'
            },
        },
        h3: {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem'
            },
            fontWeight: 700
        },
        h4: {
            fontSize: '1rem',
            fontWeight: 400,
            textUnderlineOffset: 2.5,
            textDecoration: 'underline'
        },
        h5: {
            fontSize: '1rem'
        },
        ...{
            strong: {
                fontWeight: 500,
            }
        }
    },
    palette: {
        //green
        primary: {
            main: "#355E3B",
        },
        //blue
        secondary: {
            main: "#4169e1",
        },
        success: {
            main: "#FFFFFF"
        },
        ...{
            darkMode: {
                main: "#282a28",
            },
            lightMode: {
                main: "#FFFFFF"
            },
            danger: {
                main: "#899934",
            },
            purple: {
                main: "#800080"
            },
            brown: {
                main: "#964B00"
            },
            orange: {
                main: "#FFA500"
            }
        },
    },
    direction: "rtl",
    ...{
        textField: {
            smallTextField: {
                width: '50%', // You can adjust the width to make it smaller
            },
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: "hover",
                sx: {
                    textUnderlineOffset: 2.5,
                },
            }
        }
    },
}));