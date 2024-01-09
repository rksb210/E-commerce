import { serverURL } from "../../../../services/FetchNodeServices"
import { useStyles } from "./ProjectCss";
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function DescriptionComponent(){
    var classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));


    var data = [{id:0,image:'oneplus11R.webp',productname:'OnePlus',ram:'8gb',color:'black',rating:4.5,price:'42,000',offerprice:'39,900'},
                {id:1,image:'oneplus11R 5g.webp',productname:'OnePlus',ram:'12gb',color:'silver',rating:5,price:'55,000',offerprice:'51,999'},
                {id:1,image:'oneplus11R 5g.webp',productname:'OnePlus',ram:'12gb',color:'silver',rating:5,price:'55,000',offerprice:'51,999'},
                {id:1,image:'oneplus11R 5g.webp',productname:'OnePlus',ram:'12gb',color:'silver',rating:5,price:'55,000',offerprice:'51,999'},
                {id:1,image:'oneplus11R 5g.webp',productname:'OnePlus',ram:'12gb',color:'silver',rating:5,price:'55,000',offerprice:'51,999'},]

    const descriptionDetails=()=>{
        return data.map((item)=>{
            return (
                <div>
                    <div style={{display:'flex',marginTop:'25px'}}>
                    <img src={`${serverURL}/images/${item.image}`} style={{width:matches?'20%':'40%',height:matches?'20%':'40%'}}/>
                    <div style={{color:'#fff',fontSize:'24px',marginTop:'18px',width:'100%',marginLeft:'8%'}}>
                        <div>{`${item.productname} ${item.ram} ${item.color}`}</div>

                        <div>
                           <span className={classes.description_offer_pink_box}>2000 off on payment otp page</span>
                           <span className={classes.description_offer_pink_box}> 9 month No Cost EMI</span>
                        </div>
                        
                        <div>
                        <span style={{color:'#12daa8',fontSize:'16px',}}> {item.rating}<StarIcon style={{fontSize:'14px',margin:'0px 5px 0px 1px'}}/></span>
                        <span style={{color:'#12daa8',fontSize:'16px',}}>(58 Ratings & 27 Reviews)</span>
                        </div>

                        <div>
                            <span>&#8377;{item.offerprice}</span>
                            <span style={{color:'#9a9a9a',margin:'1.2%'}}><s>&#8377;{item.price}</s></span>
                        </div>

                        <div style={{fontSize:'12px'}}>(Incl all Taxes)</div>

                        <div style={{display:'flex',alignItems:'center',marginTop:'20px'}}>
                            <span><LocationOnOutlinedIcon style={{fontSize:'22px'}} /></span>
                            <span  style={{fontSize:'12px'}}>Deliver at:</span>
                            <span style={{fontSize:'12px',marginLeft:'1%',color:'#12daa8'}}>Mumbai, 400049</span>
                        </div>

                        <div style={{fontSize:'12px',marginLeft:'6%'}}>Standard deliver by Fri,10 Nov</div>

                        
                    </div>
                    <div><Checkbox icon={<FavoriteBorder style={{color:'white'}}/>} checkedIcon={<Favorite style={{color:'red'}}/>} /></div>
                    
                    </div>
                    <div><hr color='#9a9a9a' size='1'/></div>
                </div>
            )
        })

       
    }
    return (<div>
        {/* <div><hr color='#9a9a9a' size='1' style={{transform:'rotate(90deg)'}}/></div> */}
        <div style={{color:'#fff',fontSize:'24px',fontWeight:'bolder'}}>One Plus 11R 8GB</div>
        <div>{descriptionDetails()}</div>
    </div>)
}