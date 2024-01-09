import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function TopBrandsComponent({brands}){
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));
      const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
      const matches_xsm = useMediaQuery('(max-width:400px)');

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches?4.5:matchesSearch?4.5:8,
        slidesToScroll: 7,
        arrows:matches?false:true,
        rows:matches?2:1,
        focusOnSelect:true

      };
      

      const topBrandSlider=()=>{
        return brands.map((item)=>{
            return(
            <div style={{display:"flex",justifyContent:'center',width:'100%',}}>
              <div>
                <div style={{display:'flex',justifyContent:'center'}}><img src={`${serverURL}/images/${item.logo}`} style={{width:matches?'50%':'98%',margin:'5px'}}/></div>
                {/* <div style={{color:'#fff',fontSize:matches?'2vw':'1vw',textAlign:'center'}}>{item.brandname}</div> */}
               
            </div>
            </div>)
        })
      }
    return (<div style={{width:matches?'100%':'70%',marginLeft:matches?'0%':'14%',marginTop:'2%'}}>
        <div style={{color:'#fff',fontSize:matches_xsm?'4.2vw':matches_sm?'4vw':matches?'3vw':'1.5vw',marginBottom:7}}>Top Brands</div>
                <Slider {...settings}>
                    {topBrandSlider()}
                </Slider>
    </div>)
}


