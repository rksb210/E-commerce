import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button,Menu,MenuItem, Stack} from '@mui/material';
import React,{ useState,useEffect } from 'react';
import { postData,getData } from '../../../../services/FetchNodeServices';

export default function MenuComponent() {
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesSearch = useMediaQuery('(max-width:950px)');

      const [anchorEl, setAnchorEl] = React.useState(null);
      const [category,setCategories]=useState([])
      const [products,setProducts]=useState([])

      const open = Boolean(anchorEl);
      
      const handleClick = (categoryid,event) => {
        setAnchorEl(event.currentTarget);
        fetchProducts(categoryid)
      };
      const handleClose = () => {
        setAnchorEl(null);
      };


      const fetchCategory= async ()=>{
            var result = await getData('userinterface/display_all_category')
            setCategories(result.data)
        }

        const fetchProducts= async (categoryid)=>{
          var result = await postData('userinterface/display_all_products_for_menu',{categoryid:categoryid})
          setProducts(result.data)
      }

        useEffect(function(){       
          fetchCategory()          
        },[])

        const showMenu=()=>{
          return category.map((item,i)=>{
            if(i>=0 && i<=10){
            return <Button         
              style={{color:'#fff'}}
              onClick={(event)=>handleClick(item.categoryid,event)}
             >
            {item.categoryname}
          </Button>
            }
          })
        }

        const showMenuItems=()=>{
          return products.map((item)=>{
            return <MenuItem onClick={handleClose}>{item.productname}</MenuItem>
          })
        }

  
    return (
      <>
      
      <Box sx={{ flexGrow: 1 }}>
           <AppBar  position="static"  style={{height:'45px',background:'#191919',display:'flex',justifyContent:'center',alignItems:'center'}} >           
            <Toolbar>
            {showMenu()}
            {/* <div>More</div> */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}        
      >        
       {showMenuItems()}
      </Menu>             
            </Toolbar>           
      </AppBar>
      </Box>
      </>
    );
  }

