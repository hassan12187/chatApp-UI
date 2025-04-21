import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom';
import { useCustom } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import Axios from './axios';
import socket from '../services/socket';
import FriendRequestList from './friendRequestList';
import { memo } from 'react';
import {Search,SearchIconWrapper,StyledInputBase,pages,settings} from './ComponentsForHeader';

export const Header = memo(()=> {
  const [state,setState]=React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {removeToken,user,token} = useCustom();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchVal,setSearchVal] = React.useState("");
  const [friendRequests,setFriendRequests]=React.useState([{}]);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const {data,isLoading} = useQuery({
    queryKey:['search-input',searchVal],
    queryFn:async()=>{
      const result = await Axios.get(`/user/allUsers?q=${searchVal}`,{
        headers:{
            Authorization:`Bearer ${token}`
          }
        });
        return Array.from(result.data);
      }
    })
  const {data:friendReq,isLoading:friendReqDataLoading}=useQuery({
    queryKey:['friendReq'],
    queryFn:async()=>{
      try {
        const result = await Axios.get('/user/friendRequests',{
          headers:{Authorization:`Bearer ${token}`}
        });
        result.viewed = false;
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime:Infinity,
    cacheTime:Infinity
  })
      socket.on('friendOnline',(onlineFriend)=>{
      console.log("hello ?",onlineFriend);
    })
  React.useEffect(()=>{
    socket.on('new_friend_request',(val)=>{
      console.log("you have new friend request.",val);
      setFriendRequests((prev)=>{return [...prev,val]});
    })
    socket.on("request_accepted",(result)=>{
      console.log(result);
    });

  },[socket])
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <NavLink to={'/myaccount'}><MenuItem onClick={handleMenuClose}>My Account</MenuItem></NavLink>
      <MenuItem onClick={removeToken}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />  
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <NavLink to={'/'}>HOME</NavLink>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <div className='search-input'>
            <StyledInputBase
              placeholder="Search…"
              value={searchVal}
              inputProps={{ 'aria-label': 'search' ,onKeyDown:(e)=>{
                if(e.keyCode === 13){
                  setSearchVal("");
                }
              },onChange:(e)=>{
                setSearchVal(e.target.value);
              }}}
            />{
              !isLoading?(
            <div className='drop-down'>
                <div className='content'>
                  <ul>
                    {data?.map((searchUser,index)=>{return <NavLink key={index} to={`user/${searchUser?._id}`}>
                    <li>{searchUser.username} {searchUser?._id ===user?._id ? "(Me)" : null }</li>
                    </NavLink>
                    })} 
                  </ul>
                </div>
            </div>
              ):null
            }
            </div>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={friendReq?.viewed === false ? friendReq?.data.length : null} color="error" className='notification-icon'>
                <MailIcon onClick={()=>{
                  setState(!state);
                  friendReq.viewed=true;
                }} />
                {
                  state?
             <FriendRequestList friendReq={friendReq?.data} />:null
                }
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
})