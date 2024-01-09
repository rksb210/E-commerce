import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../../../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStyles } from "../ProjectCss";
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from "react";

export default function LeftSpecComponent(props) {
  var classes = useStyles()
  var product = props.product
  console.log('safarii:',product)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));

  var settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: false,
    infinite: true,
  };
  // var data = Object.values(props)

  // var picture = data[0].picture.split(",")
  var data = product?.picture.split(",")

  const [image,setImage] = useState('')

  useEffect(function(){
    setImage(data[0])
  },[props])

  const handleImageChange=(item)=>{
     setImage(item)
  }
  
  const specSlider = () => {
    return data.map((item) => {
      return (
        <div onClick={()=>handleImageChange(item)} style={{ width: '100%' }}>
          <div style={{ width: '90%', border: '2px solid #353535' }}>
            <img src={`${serverURL}/images/${item}`} height="100%" width="100%" style={{ transform: 'rotate(-90deg)' }} />
          </div>
        </div>
      )
    })
  }

  return (
    <div style={{ width: '100%' }} >
      <div style={{width:'90%', transform: 'rotate(90deg)', marginTop: '25%',marginLeft:'auto'}}>
        <div style={{ width: '50%' }}>
          <img src={`${serverURL}/images/${image}`} width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}></img>
        </div>
        

        <div style={{ width: '70%' }}>
          <Slider {...settings} style={{ width: "100%" }}>
            {specSlider()}
          </Slider>         
        </div>
      </div>
    </div>
  )
}
{/* <div style={{width:'100%',transform:'rotate(90deg)'}}>
        <div style={{ width: '50%', transform: 'rotate(-90deg)',display:'flex'}}>
          <img src={`${serverURL}/images/${'m1.webp'}`} style={{ width: '100%'}} />
          <div style={{width:'20%',display:'flex'}}>
                <div style={{ marginTop: '10%' }}><Checkbox icon={<FavoriteBorder style={{ color: '#fff' }} />} checkedIcon={<Favorite style={{ color: 'red' }} />} /></div>
                <div style={{ marginTop: '20%',marginLeft:'10px' }}><ShareIcon style={{color:'#fff'}} /></div>
            </div>
        </div>

        <div style={{width:'50%'}}>
          <Slider {...settings}>
            {specSlider()}
          </Slider>
        </div>
      </div> */}


