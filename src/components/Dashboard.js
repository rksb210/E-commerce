import { Grid,Avatar,Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/ProductionQuantityLimits';
import BannerIcon from '@mui/icons-material/Collections';
import CategoryBannerIcon from '@mui/icons-material/Wallpaper';
import ProductDetailIcon from '@mui/icons-material/Details';
import BrandIcon from '@mui/icons-material/BrandingWatermark';
import { serverURL } from "../services/FetchNodeServices";

import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Brands from "../components/Brands";
import  {Category}  from "../components/Category";
import DisplayAllBrands from "../components/DisplayAllBrands";
import {DisplayAllCategory} from "../components/DisplayAllCategory"
import Products from "../components/Products";
import DisplayAllProducts from "../components/DisplayAllProducts";
import ProductDetails from "../components/ProductDetails";
import DisplayAllProductDetails from "../components/DisplayAllProductDetails";
import Banner from "../components/Banner";
import CategoryBanners from "../components/CategoryBanners";
import { useNavigate } from "react-router-dom";


var useStyles = makeStyles({
    root:{
        width:'100vw',
        height:'100vh',
        display:'flex',
        //justifyContent:'center'
    },
    box1:{
        width:500,
        height:669,
        background:'#FAEBD7',
        padding:10,
        margin:10,
        display:'flex',
        flexDirection:"column",
        justifyContent:'center'
    },
    box2:{
        background:'#fff',
        height:669
    },
    heading:{
        height:70,
        padding:5,
        background:'black',
        color:'white',
        display:'flex',
        alignItems:'center'

    },
    sideBox1:{
        height:80,
        width:350,
        background:'#BDC581',
        marginTop:50,
        borderRadius:10,
        display:'flex',
        alignItems:'center',
        borderSpacing:10,
        
    },
    sideBox2:{
        height:600,
        width:350,       
       marginTop:30
    },
    insideBox:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
       
    },
    button:{
        display:'flex',
        justifyContent:'center',
        borderRadius:5
    }

})



export default  function Dashboard(){
    var useStyle = useStyles()
    var navigate = useNavigate()

    var admin = JSON.parse(localStorage.getItem("ADMIN"))
    return (
        <div>
            <Grid container className={useStyle.root}>
                <Grid item xs={12} className={useStyle.heading}>
                    <DashboardCustomizeIcon style={{paddingLeft:5}}/>
                    <h1 style={{marginLeft:5}}>Electronics Hub</h1>
                    <Avatar style={{marginLeft:'auto'}} src={`${serverURL}/images/${admin.picture}`}/>
                </Grid>


                <Grid container style={{display:'flex'}}>

                <Grid style={{flexDirection:"column"}} item xs={3} className={useStyle.box1}>

                    <Grid className={useStyle.sideBox1}>
                        <div>
                           <Avatar style={{height:55,width:55,marginLeft:10}} src={`${serverURL}/images/${admin.picture}`}/>
                        </div>

                    <div>
                        <div style={{marginLeft:40,fontWeight:'bold',fontSize:25}}>{admin.username}</div>                        
                        <div style={{display:'flex',justifyContent:'end',marginLeft:40}}>{admin.emailid}</div>
                        <div style={{display:'flex',justifyContent:'end',marginLeft:40}}>+91-{admin.mobileno}</div>
                    </div>

                    </Grid>
                   
                    <Grid className={useStyle.sideBox2}>
                       <List>
                            {/* <ListSubheader sx={{borderRadius:5,justifyContent:'center',display:'flex'}}>
                                List Of Electronics
                            </ListSubheader> */}

                            <ListItemButton onClick={()=>navigate('/dashboard/dashboard')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <LeaderboardIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >Dashboard</ListItemText>
                            </ListItemButton>
                            
                            <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <CategoryIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >Category</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={()=>navigate('/dashboard/displayallbrands')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <BrandIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >Brands</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={()=>navigate('/dashboard/displayallproducts')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <ProductIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >Products</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={()=>navigate('/dashboard/displayallproductdetails')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <ProductDetailIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >ProductDetails</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={()=>navigate('/dashboard/banner')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <BannerIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >Banners</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={()=>navigate('/dashboard/categorybanners')}>
                            <ListItemIcon sx={{marginLeft:2}}>
                                <CategoryBannerIcon />
                            </ListItemIcon>
                                <ListItemText className={useStyle.insideBox} sx={{justifyContent:'start',display:'flex'}} >CategoryBanners</ListItemText>
                            </ListItemButton>
                        </List>
                    </Grid>
             
                    <Grid className={useStyle.button}>
                        <Button sx={{marginBottom:8,width:100}}  variant="contained">Logout</Button>
                    </Grid>
                    

                </Grid>
                


                <Grid item xs={9} className={useStyle.box2}>
            <Routes>
                <Route element={<Category />} path="/category" />
                <Route element={<DisplayAllCategory />} path="/displayallcategory" />
                <Route element={<Brands />} path="/brands" />
                <Route element={<DisplayAllBrands />} path="/displayallbrands" /> 
                <Route element={<Products />} path="/products" />
                <Route element={<DisplayAllProducts />} path="/displayallproducts" /> 
                <Route element={<ProductDetails />} path="/productdetails" />
                <Route element={<DisplayAllProductDetails />} path="/displayallproductdetails" />
                <Route element={<Banner />} path="/banner" />
                <Route element={<CategoryBanners />} path="/categorybanners" />
          </Routes>
                </Grid>

                </Grid>

            </Grid>
        </div>
    )
}