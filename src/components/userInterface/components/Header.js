import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../../assets/croma.gif';
import SearchComponent from './SearchComponent';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState,useEffect } from 'react';
import Fade from '@mui/material/Fade';
import { getData, serverURL } from '../../../services/FetchNodeServices';

import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

export default function Header(){


  var userData = JSON.parse(localStorage.getItem("User"))
     var navigate = useNavigate()
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesSearch = useMediaQuery('(max-width:950px)');
      var cart = useSelector(state=>state.myCart)
      var productCart = Object.values(cart)

     
      const [category,setCategories]=useState([])

      const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: 250,background:'#353535',color:'#fff',height:'100vh'}}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {category.map((text, index) => (
              <ListItem key={text.categoryid} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <img src={`${serverURL}/images/${text.image}`} style={{width:'50px'}}/>
                  </ListItemIcon>
                  <ListItemText primary={text.categoryname} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
        </Box>
      );
      

      const fetchCategory= async ()=>{
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)
    }

    useEffect(function(){       
      fetchCategory()          
    },[])

    const handleClick=()=>{
       navigate('/cart')
    }

    const handleHomeClick=()=>{
      navigate('/home')
    }
    const handleUserClick=()=>{
      navigate('/profiledetails')
    }
    

    return (
      <>
      <Box sx={{ flexGrow: 1}}>
           
           
           <AppBar  position="static"  style={{backgroundImage:'url(https://media.croma.com/image/upload/v1697816449/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Desktop_-_Navratri_opt.3_glsdyl.jpg)'}}
           >
            
            
            <Toolbar>
            {matchesSearch?<div style={{display:'flex',marginTop:'10px'}}>
              
              <React.Fragment key={'left'}>
              <MenuIcon
  
                onClick={toggleDrawer('left', true)}
                style={{color:'#fff',fontWeight:'bolder',fontSize:'40px'}}/>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}           
            >            
              {list('left')}
            </Drawer>
          </React.Fragment>     
              </div>:
                      <div>
                        <></> 
                      </div> 
                    } 

              <div style={{ display:'flex',justifyContent:'right'}}>
                 <img src={Logo} width={150} style={{marginLeft:matchesSearch?'0%':120}} onClick={handleHomeClick}/>
              </div>
   
            
            {matchesSearch?<></>:
              <div style={{width:matches?'100%':'35%',marginLeft:matchesSearch?'0':'10%'}}>
                <SearchComponent />  
              </div> 
             } 
                 <div style={{marginLeft:matchesSearch?'8rem':matches?'0rem':'10rem',display:'flex',flexDirection:'row',gap:matchesSearch?'0.5rem':'5rem'}}>
                  <div>
                   <div><PersonOutlineTwoToneIcon style={{fontSize:35,marginLeft:matchesSearch?'auto':'15%'}} onClick={handleUserClick} /> </div>
                   <div style={{fontSize:'12px',color:'#fff'}}>{userData?.firstname}</div>   
                  </div> 
                <div> 
                  <div style={{marginTop:'0.5rem'}}>      
                <Badge badgeContent={productCart?.length} color="primary">
                <ShoppingCartTwoToneIcon  style={{fontSize:35,marginRight:matchesSearch?'1%':'10%',marginLeft:'3%'}} onClick={handleClick}/>
                </Badge>
                </div>
                </div>
                </div>
                

            </Toolbar>
                  {matchesSearch?<div style={{margin:'20px'}}><SearchComponent/></div>:<></>}
      </AppBar>
      
      </Box>
      </>
    );
  }