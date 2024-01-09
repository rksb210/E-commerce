import Header from "../Header";
import { useStyles } from "./ProjectCss";
import MainSlider from "./MainSlider";
import AddComponent from "./AddComponent";
import CircleComponent from "./CircleComponent";
import FestiveDealsComponent from "./FestiveDealsComponent";
import ProductComponent from "./ProductComponent";
import HighlightsComponent from "./HighlightsComponent";
import { useEffect, useState } from "react";
import { getData, postData } from "../../../../services/FetchNodeServices";
import MenuComponent from "./MenuComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TopBrandsComponent from "./TopBrandsComponent";


export default function Home(){
    const classes = useStyles()
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesSearch = useMediaQuery('(max-width:950px)');

    const [banners,setBanners]=useState([])
    const [category,setCategories]=useState([])
    const [brands,setBrands]=useState([])
    const [productDeals,setproductDeals]=useState([])

    const fetchBanners= async ()=>{
        var result = await getData('userinterface/fetch_all_banners')
        setBanners((result.data[0].files).split(','))
    }
    const fetchCategory= async ()=>{
        var result = await getData('userinterface/display_all_category')
        setCategories(result.data)
    }
    const fetchBrands= async ()=>{
        var result = await getData('userinterface/display_all_brands')
        setBrands(result.data)
        console.log('sdfacsd',result.data)
    }
    const fetchProductDeals= async ()=>{
        var result = await postData('userinterface/display_all_productdetails_by_status',{status:'Deal of the day'})
        setproductDeals(result.data)
    }
    useEffect(function(){
        fetchBanners()
        fetchCategory()
        fetchProductDeals()
        fetchBrands()
    },[])
    return (
        <div className={classes.home_root}>
            <div style={{position:'sticky',top:0,zIndex:2}}>
            <Header/>
            </div>
            {matchesSearch?<></>:<div style={{position:'relative',zIndex:1}}><MenuComponent /></div>}
            <div>
            <MainSlider banners={banners}/>
            </div>
            <AddComponent />
            <CircleComponent category={category}/>
            <FestiveDealsComponent />
            <ProductComponent data={productDeals} title={'Deal of the day'} />
            <HighlightsComponent />
            <TopBrandsComponent brands={brands}/>
            
            
           
        </div>
    )
}