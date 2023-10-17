
import { Outlet } from 'react-router-dom'
import Header from './header/header'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { theme } from '../services/theme'

export default function Layout() {

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);

    const modeColorText = useMemo(() => {
        if (darkMode)
        return theme.palette.success.main
            return theme.palette.darkMode.main
    }, [darkMode]);

    return (
        <div style={{  color: modeColorText }}>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}
