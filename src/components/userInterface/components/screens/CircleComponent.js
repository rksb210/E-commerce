import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function CircleComponent({category}){
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: matches?4.5:8,
        slidesToScroll: 7,
        arrows:matches?false:true,
        rows:matches?2:1,
        focusOnSelect:true

      };
      // var data = [{id:0,icon:'c0.png',categoryname:"What's New"},
      // {id:1,icon:'c1.png',categoryname:"Mobiles"},
      // {id:2,icon:'c2.png',categoryname:"Televisions"},
      // {id:3,icon:'c3.png',categoryname:"Laptops"},
      // {id:4,icon:'c4.png',categoryname:"HeadPhones"},
      // {id:5,icon:'c5.png',categoryname:"Refrigerator"},
      // {id:6,icon:'c6.png',categoryname:"Home Theater"},
      // {id:7,icon:'c7.png',categoryname:"Air Conditioners"},
      // {id:8,icon:'c8.png',categoryname:"Speakers"},
      // {id:9,icon:'c9.png',categoryname:"Washing Machines"},
      // {id:10,icon:'c10.png',categoryname:"Kitchen Appliances"},
      // {id:11,icon:'c11.png',categoryname:"Grooming"},
      // {id:12,icon:'c12.png',categoryname:"Tablets"},
      // {id:13,icon:'c13.png',categoryname:"Wearables"},]

      const circleSlider=()=>{
        return category.map((item)=>{
            return(
            <div style={{display:"flex",justifyContent:'center',width:'100%',}}>
              <div>
                <div style={{display:'flex',justifyContent:'center'}}><img src={`${serverURL}/images/${item.image}`} style={{width:matches?'50%':'98%',margin:'5px'}}/></div>
                <div style={{color:'#fff',fontSize:matches?'2vw':'1vw',textAlign:'center'}}>{item.categoryname}</div>
               
            </div>
            </div>)
        })
      }
    return (<div style={{width:matches?'100%':'70%',marginLeft:matches?'0%':'14%',marginTop:'2%'}}>
                <Slider {...settings}>
                    {circleSlider()}
                </Slider>
    </div>)
}


