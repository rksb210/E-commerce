// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Logo from '../../../assets/croma.gif';
// import SearchComponent from './SearchComponent';
// import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
// import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import MenuIcon from '@mui/icons-material/Menu';

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { useState,useEffect } from 'react';
// import Fade from '@mui/material/Fade';
// import { getData } from '../../../services/FetchNodeServices';

// export default function Header(){
//       const theme = useTheme();
//       const matches = useMediaQuery(theme.breakpoints.down('sm'));
//       const matchesSearch = useMediaQuery('(max-width:950px)');

//       const [anchorEl, setAnchorEl] = useState(null);
//       const [category,setCategories]=useState([])
//       const open = Boolean(anchorEl);
//       const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//       };
//       const handleClose = () => {
//         setAnchorEl(null);
//       };

//       const fetchCategory= async ()=>{
//         var result = await getData('userinterface/display_all_category')
//         setCategories(result.data)
//     }

//     useEffect(function(){       
//       fetchCategory()          
//     },[])

//     const showMenuItems=()=>{
//       return category.map((item)=>{
//         return <MenuItem onClick={handleClose}>{item.categoryname}</MenuItem>
//       })
//     }

//     return (
//       <>
//       <Box sx={{ flexGrow: 1 }}>
//            <AppBar  position="static"  style={{backgroundImage:'url(https://media.croma.com/image/upload/v1697816449/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Desktop_-_Navratri_opt.3_glsdyl.jpg)'}}>
//             <Toolbar>

//               <div style={{ display:'flex',justifyContent:'right'}}>
//                  <img src={Logo} width={150} style={{marginLeft:matchesSearch?'0%':120}}/>
//               </div>
   
            
//             {matchesSearch?<></>:
//               <div style={{width:matches?'100%':'35%',marginLeft:matchesSearch?'0':'10%'}}>
//                 <SearchComponent />  
//               </div> 
//              } 
            
//                 <PersonOutlineTwoToneIcon style={{fontSize:35,marginLeft:matchesSearch?'auto':'15%'}} />             
//                 <ShoppingCartTwoToneIcon  style={{fontSize:35,marginRight:matchesSearch?'1%':'10%',marginLeft:'5%'}} />

//             </Toolbar>
//             {matchesSearch?<div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'0px 10px 20px 2px'}}>
//               <MenuIcon 
//               id="fade-button"
//               aria-controls={open ? 'fade-menu' : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? 'true' : undefined}
//               onClick={handleClick}
//               style={{color:'#fff',fontWeight:'bolder'}}/>
//                   <Menu
//               id="fade-menu"
//               MenuListProps={{
//                 'aria-labelledby': 'fade-button',
//               }}
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               TransitionComponent={Fade}
//             >
//               {showMenuItems()}
//             </Menu>
      
//             <SearchComponent /></div>:
//                     <div>
//                       <></> 
//                     </div> 
//                   } 
//       </AppBar>
      
//       </Box>
//       </>
//     );
//   }