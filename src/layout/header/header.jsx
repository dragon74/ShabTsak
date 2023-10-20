// 3rd library
import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// project imports
import { theme } from "../../services/theme"
import Logo from '../../components/general_comps/logo'
import MyInfo from '../../services/myInfo';
import { TOKEN_NAME } from '../../services/apiService';
import { resetUser } from "../../features/userSlice"
import { changeFavorites, changeHome } from "../../features/featuresSlice"
import { setOpenFollowers, setOpenFollowings } from "../../features/dialogSlice"
import DialogFollowers from '../../components/client/followers/dialogFollowers';
import DialogFollowings from '../../components/client/followings/dialogFollowings';
import { setUserIdFollowers, setUserIdFollowings } from "../../features/dialogSlice"
import { changeDarkMode } from "../../features/featuresSlice"


export default function Header() {
  const { user } = useSelector(myStore => myStore.userSlice);
  // console.log(user);

  const { home, favorites } = useSelector(myStore => myStore.featuresSlice);

  const nav = useNavigate();
  const dispatch = useDispatch();

  //navbar states
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [displayBurger, setDisplayBurger] = useState("block");
  const [displayButtonX, setDisplayButtonX] = useState("none");

  //dialog open-close
  const [isOpen, setIsOpen] = useState(Boolean);

  //nanbar functions
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setDisplayBurger("none")
    setDisplayButtonX("block")
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setDisplayBurger("block")
    setDisplayButtonX("none")
  };

  //close userMenu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //my profile option
  const goToMyProfile = () => {
    nav("/myProfile")
    handleCloseUserMenu()
  }

  // dialog Logout option functions
  const handleClose = () => {
    setIsOpen(false);
  };
  const ClickLogout = () => {
    setIsOpen(true);
    handleCloseUserMenu()
  };

  // dialog Followers option functions 
  const ClickFollowers = () => {
    dispatch(setOpenFollowers({ val: true }))
    dispatch(setUserIdFollowers({ val: user._id }))
    handleCloseUserMenu()
  };


  // dialog Followings option functions 
  const ClickFollowings = () => {
    dispatch(setOpenFollowings({ val: true }))
    dispatch(setUserIdFollowings({ val: user._id }))
    handleCloseUserMenu()
  };


  // dialog onLogOut option functions 
  const onLogOut = () => {
    //delete token
    localStorage.removeItem(TOKEN_NAME);
    //delete user from redux
    dispatch(resetUser())
    toast.success("You log Out")
    nav("/")
  }

  const srcImg = React.useMemo(() => {
    if (user.img_url == "" && user.sex == "male") {
      return "/images/man.png";
    } else if (user.img_url == "" && user.sex == "female") {
      return "/images/woman.png";
    } else {
      return user.img_url;
    }
  }, [user]);


  //darkMode
  const { darkMode } = useSelector(myStore => myStore.featuresSlice);

  return (
    <ThemeProvider theme={theme}>

      {/* provide details of user (that login) to all comps with redux */}
      <MyInfo />

      <AppBar
        position="static" color={darkMode == false ? 'lightMode' : 'darkMode'}
      // sx={{ background: "rgba(255, 255, 255, 1)" }}
      >
        <Container maxWidth="lg" >
          <div className='d-flex justify-content-between align-items-center' >
            <div className='d-none d-md-flex'>
              <Link to="/foods">
                <Logo margin={"mb-1"} />
              </Link>
            </div>

            <div className='d-flex d-md-none '>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
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
                <MenuItem onClick={() => {
                  nav("/foods")
                  handleCloseNavMenu()
                }}>
                  Home</MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  nav("/myFavorites")
                }}>Favorites</MenuItem>
              </Menu>
            </div>

            <div className='d-flex d-md-none mx-auto'>
              <Link to="/foods">
                <Logo margin={"mb-1"} />
              </Link>
            </div>

            <div className='d-none d-md-flex' >
              <div>
                <Button
                  onClick={() => {
                    // handleCloseNavMenu()
                    nav("/foods")
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}>
                  Home
                </Button>
                <div className="mx-auto" style={{ display: home, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
              </div>

              <div >
                <Button
                  // onClick={handleCloseNavMenu}
                  onClick={() => {
                    dispatch(changeHome({ val: "none" }))
                    dispatch(changeFavorites({ val: "block" }))
                    nav("/myFavorites")
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}
                >
                  Favorites
                </Button>
                <div className="mx-auto" style={{ display: favorites, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
              </div>
            </div>


            <div className='d-flex align-items-center justify-content-md-end'>
              <Tooltip title={user.name} >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={srcImg} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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

                <MenuItem onClick={goToMyProfile}>Profile</MenuItem>
                <MenuItem onClick={ClickFollowers}>Followers</MenuItem>
                <MenuItem onClick={ClickFollowings}>Followings</MenuItem>
                <MenuItem onClick={ClickLogout}>Logout</MenuItem>
                <div className='text-center'>
                  {darkMode==false?"Light":'Dark'}
                  <IconButton sx={{ ml: 1 }} onClick={()=>{dispatch(changeDarkMode())}} color="inherit">
                    {darkMode==true ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </div>

                <DialogFollowers />
                <DialogFollowings />

             {isOpen&&
                <Dialog
                  open={isOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className='p-3'>
                    <DialogTitle
                      sx={{ mb: 2 }}
                      id="alert-dialog-title">
                      {"Are you sure you want to logout?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Disagree</Button>
                      <Button onClick={onLogOut} autoFocus>Agree</Button>
                    </DialogActions>
                  </div>
                </Dialog>
             } 

              </Menu>
            </div>
          </div>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}
