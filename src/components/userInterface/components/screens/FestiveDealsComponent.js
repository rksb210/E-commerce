import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function FestiveDealsComponent(){
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
      const matches_xsm = useMediaQuery('(max-width:400px)');

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches?4.5:4,
        slidesToScroll: 3,
        arrows:matches?false:true,
        focusOnSelect:true
      };

      var data = [{id:1,icon:'d1.webp'},
                  {id:2,icon:'d2.webp'},
                  {id:3,icon:'d3.webp'},
                  {id:4,icon:'d4.webp'},
                  {id:5,icon:'d5.webp'},
                  {id:6,icon:'d6.webp'},
                  {id:7,icon:'d7.webp'},
                  {id:8,icon:'d8.webp'},]

      const festiveDealsSlider=()=>{
        return data.map((item)=>{
            return(<div>
                <img src={`${serverURL}/images/${item.icon}`} style={{width:'95%',padding:'3%'}}/>               
            </div>)
        })
      }

    return (<div style={{width:matches?'100%':'70%',marginLeft:matches?'0%':'14%',marginTop:'3%'}}>
              <div style={{color:'#fff',fontSize:matches_xsm?'4.2vw':matches_sm?'4vw':matches?'3vw':'1.5vw',marginBottom:7}}>Festive Fiesta Deals</div>
                <Slider {...settings}>
                    {festiveDealsSlider()}
                </Slider>
    </div>)
}


