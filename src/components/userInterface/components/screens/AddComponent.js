import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { Matches } from "./ProjectCss";


export default function AddComponent(){
    const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:matches?false:true
      };
      var data = ['banner1.webp','banner2.webp','banner1.webp','banner2.webp','banner1.webp','banner2.webp',]

      const addSlider=()=>{
        return data.map((item)=>{
            return(<div>
                <img src={`${serverURL}/images/${item}`} style={{width:'98%',margin:'5px',marginTop:'5px'}}/>
            </div>)
        })
      }
    return (<div style={{width:'70%',marginLeft:'14%'}}>
                <Slider {...settings}>
                    {addSlider()}
                </Slider>
    </div>)
}


// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { serverURL } from "../../../../services/FetchNodeServices";
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useState } from "react";
// // import { Matches } from "./ProjectCss";


// export default function MainSlider(){
//     const theme = useTheme();
//     const [zoom,setZoom]=useState(false)
//       const matches = useMediaQuery(theme.breakpoints.down('md'));
//     var settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         autoplay:true,
//         autoplaySpeed:3000,
//         focusOnSelect:true,
//         // arrows:matches?false:true
//         arrows:false
//       };
//       var data = ['b1.webp','b2.webp','b3.webp','b4.webp','b5.webp','b6.webp','b7.webp','b8.gif']

//       const showSlider=()=>{
//         return data.map((item)=>{
//             return(<div onMouseEnter={()=>setZoom(true)}  onMouseLeave={()=>setZoom(false)}>
//               {zoom?
//                 <img src={`${serverURL}/images/${item}`} width= '51%' />
//               :
//                 <img src={`${serverURL}/images/${item}`} width= '50%' />
//               }
//             </div>)
//         })
//       }
//     return (<div style={{width:'98%'}}>
//                 <Slider {...settings}>
//                     {showSlider()}
//                 </Slider>
//     </div>)
// }