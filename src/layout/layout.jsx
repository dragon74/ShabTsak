import { Outlet } from 'react-router-dom';
import Header from './header/header';
import Footer from './footer/footer';
import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme, cacheRtl } from '@/theme/theme';
import { Box, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { useDarkModeStore } from "@/theme/useDarkModeStore.jsx";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData'
import he from "dayjs/locale/he"

export default function Layout() {
    const darkMode = useDarkModeStore((store) => store.darkMode);

    const modeColorText = useMemo(() => {
        if (darkMode)
            return theme.palette.lightMode.main
        return theme.palette.darkMode.main
    }, [darkMode]);

    const modeBackground = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.lightMode.main
    }, [darkMode]);

    async function initializeLocale() {
        dayjs.extend(localeData);
        dayjs.extend(weekday);
        dayjs.locale(he);
    }


    React.useEffect(() => {
        initializeLocale()
    }, [])

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box style={{
                    background: modeBackground, color: modeColorText,
                    display: 'flex',
                    // Use flex-direction to make the children stack vertically
                    flexDirection: 'column', minHeight: '100vh',
                }}>
                    <Header/>
                    <Outlet/>
                    <Footer/>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    )
}
