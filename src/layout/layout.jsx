import { Outlet } from 'react-router-dom';
import Header from './header/header';
import Footer from './footer/footer';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme, cacheRtl } from '../services/theme';
import { Box, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';

export default function Layout() {

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);

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

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box style={{
                    background: modeBackground, color: modeColorText,
                    display: 'flex',
                    // Use flex-direction to make the children stack vertically
                    flexDirection: 'column', minHeight: '100vh',
                }}>
                    <Header /> 
                    <Outlet />
                    <Footer />
        
                </Box>
            </ThemeProvider>
        </CacheProvider>
    )
}
