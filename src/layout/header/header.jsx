import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { theme } from "../../services/theme";
import Logo from '../../components/general_comps/logo';
import srcImg from '/images/man.png';
import { changeDarkMode } from "../../features/featuresSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    // Navbar states
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [displayBurger, setDisplayBurger] = useState("block");
    const [displayButtonX, setDisplayButtonX] = useState("none");

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

    // Dark Mode
    const { darkMode } = useSelector((myStore) => myStore.featuresSlice);

    const ClickLogout = () => {
        nav("/");
        toast.success("With God's help we will fight and win!");
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color={darkMode === false ? 'primary' : 'darkMode'}>
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" alignItems="center">
                        {/* big screen */}
                        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Logo />
                        </Grid>

                        {/* small screen */}
                        <Grid item sx={{ display: { sx: 'flex', md: 'none' } }}>
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
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        nav("/");
                                    }}
                                >
                                    Camps
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        nav("/favorites");
                                    }}
                                >
                                    Favorites
                                </MenuItem>
                            </Menu>
                        </Grid>

                        <Grid item sx={{ display: { sx: 'block', md: 'none' } }}>
                            <Logo />
                        </Grid>

                        <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={() => {
                                    nav("/");
                                }}
                                sx={{
                                    color: 'white',
                                    px: 3,
                                    py: 3,
                                }}
                            >
                                Camps
                            </Button>
                            <Button
                                onClick={() => {
                                    nav("/favorites");
                                }}
                                sx={{
                                    color: "white",
                                    px: 3,
                                    py: 3,
                                }}
                            >
                                Favorites
                            </Button>
                        </Grid>


                        <Grid item
                            sx={{
                                display: { xs: 'none', md: 'flex', textAlign: "center", px: 3, alignItems: 'center', color: darkMode === true ? '#8ECDDD' : 'yellow' },
                            }}>
                            {darkMode === false ? "Light" : 'Dark'}
                            <IconButton onClick={() => { dispatch(changeDarkMode()) }} color={darkMode === true ? "primary" : "inherit"}>
                                {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Tooltip title="Avatar">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Avatar" src={srcImg} />
                                </IconButton>
                            </Tooltip>
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
                                    {darkMode === false ? "Light" : 'Dark'}
                                    <IconButton onClick={() => { dispatch(changeDarkMode()) }} color="inherit">
                                        {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </IconButton>
                                </MenuItem>
                                <MenuItem onClick={ClickLogout}>Good Day!</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </ThemeProvider >
    );
};

export default Header;
