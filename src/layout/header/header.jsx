/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/theme/theme";
import Logo from 'components/general_comps/logo';
import srcImg from '/images/man.png';
import { toast } from 'react-toastify';
import ROUTES from '@/constants/routeConstants';
import DialogLogOut from 'components/general_comps/dialogs/dialogLogOut';
import {useDarkModeStore} from "@/theme/useDarkModeStore.jsx";
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.jsx";

const Header = () => {
    const { user, logout } = useAuth();
    // Navbar states
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [displayBurger, setDisplayBurger] = useState("block");
    const [displayButtonX, setDisplayButtonX] = useState("none");

    //sure dialog for log out
    const [openSureDialog, setOpenSureDialog] = useState(false);

    // Navbar functions
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setDisplayBurger("none");
        setDisplayButtonX("block");
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setDisplayBurger("block");
        setDisplayButtonX("none");
    };

    // Open user menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // Close user menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { darkMode, toggleDarkMode } = useDarkModeStore();

    //open dialog LogOut
    const ClickLogOut = () => {
        handleCloseUserMenu()
        setOpenSureDialog(true);
    }

    const OnLogOut = () => {
        logout()
        toast.success("!התנתקת בהצלחה")
        setOpenSureDialog(false);
    }

    const ClickGoodLuck = () => {
        handleCloseUserMenu()
        toast.success("זכור! אלוקים איתך! יחד נלחם וננצח!");
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color={darkMode === false ? 'primary' : 'darkMode'} >
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" alignItems="center">
                        {/* big screen */}
                        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Logo />
                        </Grid>

                        {/* small screen */}
                        <Grid item sx={{ display: { sx: 'flex', md: 'none' }, ...!user ? { visibility: 'hidden'} : {} }}>
                            <IconButton
                                size="small"
                                aria-label="account of the current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="white"
                            >
                                <MenuIcon sx={{ display: displayBurger }} />
                                <CloseIcon sx={{ display: displayButtonX }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem
                                    component={RouterLink}
                                    to={ROUTES.HOME}
                                    disabled={!user}
                                >
                                    בסיסים
                                </MenuItem>
                                <MenuItem
                                    component={RouterLink}
                                    to={ROUTES.SCHEDULE}
                                    disabled={!user}
                                >
                                    לוח משמרות
                                </MenuItem>
                                <MenuItem
                                    component={RouterLink}
                                    to={ROUTES.GUARDS}
                                    disabled={!user}
                                >
                                    סד"כ
                                </MenuItem>
                            </Menu>
                        </Grid>

                        <Grid item sx={{ display: { sx: 'block', md: 'none' }, padding: '8px' }}>
                            <Logo />
                        </Grid>

                        <Grid item sx={{ display: { xs: 'none', md: 'flex' }, visibility: user ?? 'hidden' }}>
                            <Button
                                component={RouterLink}
                                to={ROUTES.HOME}
                                sx={{ color: 'white', px: 3, py: 3, }}
                            >
                                בסיסים
                            </Button>
                            <Button
                                component={RouterLink}
                                to={ROUTES.SCHEDULE}
                                sx={{ color: "white", px: 3, py: 3, }}
                            >
                                לוח משמרות
                            </Button>
                            <Button
                                component={RouterLink}
                                to={ROUTES.GUARDS}
                                sx={{ color: "white", px: 3, py: 3, }}
                            >
                                סד"כ
                            </Button>
                        </Grid>


                        <Grid item
                            sx={{
                                display: { xs: 'none', md: 'flex', textAlign: "center", px: 3, alignItems: 'center', color: darkMode === true ? '#8ECDDD' : 'yellow' },
                            }}>
                            <Tooltip title={darkMode === false ? "אור" : 'חושך'}>
                                <IconButton onClick={toggleDarkMode} color={darkMode ? "primary" : "inherit"}>
                                    {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item>
                            <Tooltip title={user?.firstName ? `שלום ${user.firstName}` : "שלום, אנא התחבר"}>
                                <IconButton onClick={user ? handleOpenUserMenu : undefined} sx={{ p: 0 }}>
                                    <Avatar alt="Avatar" src={user?.avatar || srcImg} referrerPolicy="no-referrer" />
                                </IconButton>
                            </Tooltip>
                            {user && (
                                <Menu
                                    sx={{ mt: 3 }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        sx={{
                                            display: { xs: 'block', md: 'none', textAlign: "center", px: 3, alignItems: 'center' },
                                        }}
                                    >
                                        {darkMode === false ? "אור" : 'חושך'}
                                        <IconButton onClick={toggleDarkMode} color="inherit">
                                            {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
                                        </IconButton>
                                    </MenuItem>
                                    <MenuItem onClick={ClickGoodLuck}>בהצלחה</MenuItem>
                                    <MenuItem onClick={ClickLogOut}>התנתקות</MenuItem>
                                </Menu>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            {/*sure dialog for log out need to do */}
            <DialogLogOut openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} onAction={OnLogOut} />

        </ThemeProvider >
    );
};

export default Header;
