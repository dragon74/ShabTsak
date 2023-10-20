import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { theme } from "../../services/theme";
import Logo from "../../components/general_comps/logo";
import srcImg from "/images/man.png";
import { changeDarkMode } from "../../features/featuresSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // Navbar states
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Navbar functions
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
      <AppBar position="static" color={darkMode === false ? "primary" : "darkMode"}>
        <Container maxWidth="lg">
          <Grid container alignItems="center">
            <Grid item xs={3} md={2}>
              <Logo />
            </Grid>

            <Grid item xs={6} md={4} sx={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  nav("/");
                }}
                variant="outlined"
                color="inherit"
                sx={{
                  px: 2,
                }}
              >
                Camps
              </Button>
              <Button
                onClick={() => {
                  nav("/schedule");
                }}
                variant="outlined"
                color="inherit"
                sx={{
                  ml: 2,
                  px: 2,
                }}
              >
                Schedule
              </Button>
              <Button
                onClick={() => {
                  nav("/guards");
                }}
                variant="outlined"
                color="inherit"
                sx={{
                  ml: 2,
                  px: 2,
                }}
              >
                Guards
              </Button>
            </Grid>

            <Grid item xs={3} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  dispatch(changeDarkMode());
                }}
                color={darkMode === true ? "primary" : "inherit"}
              >
                {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
                {darkMode === false ? "Light" : "Dark"}
              </Button>

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
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={ClickLogout}>Good Day!</MenuItem>
              </Menu>
            </Grid>

            <Grid item xs={3} sx={{ display: { xs: "block", md: "none" }, textAlign: "center" }}>
              <Button onClick={handleOpenNavMenu} variant="outlined" color="inherit">
                <MenuIcon />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
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
                    nav("/Schedule");
                  }}
                >
                  Schedule
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    nav("/guards");
                  }}
                >
                  Guards
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
