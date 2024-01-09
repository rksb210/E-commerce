import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ApplyCoupon(){
    return(<div style={{display:'flex',margin:'30px 16px 30px 0px',fontWeight:'bolder',fontSize:'20px',height:'25px',padding:'25px 35px',flexDirection:'row',gap:'10px',background:'#fff'}}>
        <div style={{marginTop:'5px'}}><LocalOfferIcon/></div>
        <div style={{}}>Apply Coupon</div>
        <div style={{marginLeft:'auto'}}><KeyboardArrowRightIcon fontSize='large'/></div>
    </div>)
}