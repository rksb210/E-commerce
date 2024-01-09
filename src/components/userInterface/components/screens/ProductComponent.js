import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    ellipsis_Text:{
        display:'-webkit-box',
        WebkitLineClamp:1,
        WebkitBoxOrient:'vertical',
        textOverflow:'ellipsis',
        overflow:'hidden',
        
   
        
    }
}) 

export default function   ProductComponent({data,title}){
  var classes = useStyles()
  var navigate = useNavigate()
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
      const matches_xsm = useMediaQuery('(max-width:400px)');


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches_xsm?1.5:matches_sm?2.5:matches?3.5:4,
        slidesToScroll: 1,
        arrows:matches?false:true,
        focusOnSelect:true
        
      };
      // var data = [{id:0,picture:'e1.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:5},
      // {id:0,picture:'e2.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:2},
      // {id:0,picture:'e3.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:2},
      // {id:0,picture:'e4.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:4},
      // {id:0,picture:'e5.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:5},
      // {id:0,picture:'e6.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:1},
      // {id:0,picture:'e7.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:5},
      // {id:0,picture:'e8.webp',brandname:"Iron",productname:'Coral',modelno:"1000 watt",price:500,offerprice:400,rating:3},]

      // const circleSlider=()=>{
      //   return data.map((item)=>{
      //       return(
      //       <div style={{width:'100%'}}>
      //         <div style={{width:'92%',background:'red',display:'flex',flexDirection:'column',border:'2px solid yellow'}}>
      //            <div style={{marginLeft:'auto',padding:'1vw',}}><FavoriteBorderIcon style={{color:'#fff'}}/></div>
      //           <div><img src={`${serverURL}/images/${item.picture}`} style={{width:'100%',height:'auto',borderRadius:'5%'}}/>
      //           </div>
      //          <div style={{color:'#fff',fontSize:'1.2vw'}}>{item.productname} {item.brandname} {item.modelno}</div>
              
      //          </div>
      //       </div>
      //       )
      //   })
      // }
      
      const handleClick=(item)=>{
          navigate('/specification',{state:{product:item}})
      }

      const circleSlider=()=>{
        return data.map((item)=>{
            return(             
            <div onClick={()=>handleClick(item)} style={{width:'100%'}}>
              <div style={{cursor:'pointer',width:'92%',background:'#121212',display:'flex',flexDirection:'column',marginTop:'4%',borderRadius:10}}>
                 
                <div style={{display:'flex',justifyContent:'center',flexDirection:'row',margin:'2%',position:'relative'}}><img src={`${serverURL}/images/${item.productpicture}`} style={{width:'75%',alignItems:'center',marginTop:20}}/>
                <Checkbox style={{position:'absolute' ,right:0}} icon={<FavoriteBorder style={{color:'white'}}/>} checkedIcon={<Favorite style={{color:'red'}}/>} />
                {/* <div><FavoriteBorderIcon style={{color:'#fff',position:'absolute',marginLeft:'auto'}}/></div> */}
                </div>

               <div style={{color:'#fff',fontSize:matches_xsm?'4vw':matches_sm?'2.5vw':matches?'1.8vw':'1.1vw',margin:'2%',}} className={classes.ellipsis_Text}>{item.productname} {item.brandname} {item.modelnumber} </div>

               <div style={{display:'flex',margin:'3%',color:'white',alignItems:'center'}}>
                 <div style={{fontSize:matches_xsm?'4vw':matches_sm?'2.5vw':matches?'2vw':'1.2vw'}}>&#8377;{item.offerprice}</div>
                 <div style={{fontSize:matches_xsm?'3.7vw':matches_sm?'2.2vw':matches?'1.7vw':'0.9vw',color:'#9a9a9a'}}><s>&#8377;{item.price}</s></div>
                </div>

                 <div style={{marginLeft:'2%'}}> <Rating name="read-only" value={item.rating} style={{fontSize:matches_xsm?'4vw':matches_sm?'2.5vw':matches?'2vw':24}} readOnly /></div>
               </div>
            </div>
            )
        })
      }
    
    return (<div style={{width:matches?'100%':'70%',marginLeft:matches?'0%':'14%',marginTop:'2%'}}>
              <div style={{color:'#fff',fontSize:matches_xsm?'4.2vw':matches_sm?'4vw':matches?'3vw':'1.5vw',marginBottom:7}}>{title}</div>
                <Slider {...settings}>
                    {circleSlider()}
                </Slider>
    </div>)
}


