import { postData,serverURL } from "../../../../../services/FetchNodeServices";
import { useStyles } from "../ProjectCss";
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from "@mui/styles";
import { useState,useEffect } from "react";
import PlusMinusComponent from "../PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
 import { Button } from "@mui/material";
 import parse from 'html-react-parser';
import ProductColorDetails from "../../ProductColorDetails";


const textdots = makeStyles({
  ellipsis_Text: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    boxOrient: 'vertical',
    flexDirection: 'column'
  }
})



export default function RightSpecComponent(props) {
  var classes = useStyles()
  var threedots = textdots()
  var dispatch = useDispatch()

  var product = props.product

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));

  var cart = useSelector(state=>state.myCart)
  var keys = Object.keys(cart)

  if(keys.length==0){
    product['qty']=0
  }
  else{
    if(keys.includes(product.productdetailsid+"")){
      product=cart[product.productdetailsid+""]
    }
    else{
      product['qty']=0 
    }
  }

 
  

  // var data = [{ id: 0, productname: 'OnePlus', ram: '8gb', color: 'black', rating: 4.5, price: '42,000', offerprice: '39,900' }]

  

  const handleQtyChange=(value)=>{

    if(value <= 0){
      dispatch({type:'DELETE_PRODUCT',payload:[product.productdetailsid]})
    }
    else{
    product['qty']=value
    dispatch({type:'ADD_PRODUCT',payload:[product.productdetailsid,product]})
    }
    props.setRefresh(!props.refresh)
  }

  const rightSpec = () => {
    // return data.map((item) => {
      return (<div style={{ width:'100%'}}>
        <div style={{ width:'100%',color: '#fff', fontSize: '25px', margin: '20px 0px 12px', fontWeight: 'bold'}}>{product.brandname} {product.productname} {product.modelno}</div>

        <div style={{ display: 'flex', margin: '0px 0px 5px',width:'500px' }}>
          <div className={classes.rightSpec_offer_box}>2000 off on payment otp page</div>
          <div className={classes.rightSpec_offer_box}>9 Month No cost EMI</div>
        </div>

        <div>
          <span style={{ color: '#12daa8', fontSize: '14px', }}> 4.5<StarIcon style={{ fontSize: '12px', margin: '0px 5px 0px 1px' }} /></span>
          <span style={{ color: '#12daa8', fontSize: '14px', }}>(58 Ratings & 27 Reviews)</span>
        </div>

        <div style={{ display: 'flex', margin: '10px 0px ' }}>
          <div style={{ display: 'table-column' }}>
            <div style={{display:'flex',flexDirection:'row',gap:"20px"}}>
            <div style={{ color: '#fff', fontSize: '26px'}}>&#8377;{product.offerprice}</div>
            <s style={{ color: '#fff', fontSize: '18px',marginTop:'10px' }}>&#8377;{product.price}</s>
            </div>
            <div style={{ fontSize: '12px', color: '#fff' }}>(Incl all Taxes)</div>
          </div>

          {/* <div style={{ display: 'flex', color: '#fff', margin: '10px 30px ' }}>
            <div style={{ width: '1rem', margin: '5px 0px' }}><hr /></div>
            <div style={{ border: '1px solid white', height: '1rem', display: 'flex', alignItems: 'center', padding: '6px', fontSize: '12px', borderRadius: '20%' }}>OR</div>
            <div style={{ width: '1rem', margin: '5px 0px' }}><hr /></div>
          </div>

          <div style={{ margin: '10px 30px ' }}>
            <div style={{ color: '#fff', fontSize: '20px' }}>&#8377;1883/mo*</div>
            <div style={{ color: '#12daa8', fontSize: '12px' }}><u>EMI Options</u></div>
          </div> */}

        </div>

        {/* <div style={{ margin: '0px 0px 20px' }}>
          <div style={{ color: '#fff', fontSize: '12px', margin: '0px 0px 10px' }}>RAM</div>
          <div style={{ display: 'flex' }}>
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', width: '3rem', height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>8.0</div>
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', width: '3rem', height: '1.5rem', marginLeft: '7%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>16.0</div>
          </div>

        </div>

        <div style={{ margin: '0px 0px 20px' }}>
          <div style={{ color: '#fff', fontSize: '12px', margin: '10px 0px 10px' }}>Internal Storage</div>
          <div style={{ display: 'flex' }}>
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', width: '3rem', height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>128GB</div>
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', width: '3rem', height: '1.5rem', marginLeft: '7%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>256GB</div>
          </div>

        </div> */}

         <div style={{ margin: '20px 0px 10px' }}>
          <div style={{ color: '#fff', fontSize: '15px', margin: '10px 0px 1px',fontWeight:'bold' }}>Color</div>
          </div>
          {/*<div style={{ display: 'flex' }}>
            
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>{product.color}</div>
            <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', height: '1.5rem', marginLeft: '5.5%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>Galatic Silver</div>
          </div>

        </div> */}
        <div>
        <ProductColorDetails setProduct={props.setProduct} product={props.product}  refresh={props.refresh} setRefresh={props.setRefresh}/>
        </div>

        <div style={{marginTop:'30px'}}>
          <PlusMinusComponent onChange={handleQtyChange} value={product?.qty} screen='product'/>
        </div>

        <div style={{ color: '#fff', fontWeight: 'bold',marginTop:'20px' }}>Super Saving (2 OFFERS)</div>
        <div style={{ width:'70%', color: '#dfe6e9', fontWeight: 'light', margin: '7px 0px' }}><hr /></div>

        <div style={{ display: 'flex' }}>

          <div style={{ width: '180px', color: '#fff', border: '1px groove', borderRadius: '10px', marginRight: '15px' }}>
            <div style={{ display: 'flex', width: '180px', border: '1px groove', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              <img src={`${serverURL}/images/${'Offers_logo_Pink_cdfhgx.webp'}`} width='30px' height='30px' />
              <div style={{ fontSize: '10px', padding: '6px', color: '#fff' }}>JP_AXIS,JP_ICICI,JP_HDFC,JP_CITI</div>
            </div>
            <div style={{ fontSize: '10px', padding: '20px', }} className={threedots.ellipsis_Text} >
              No-Cost EMI upto 24 month tenure on HDFC,Axis,ICICI,CITI Bank only. Select offer under view all offer
              segment on payment page to avail the benefit. T&C Apply.IMPORTANT! To Avail this offer, please ensure
              this is the only product in your cart. T&C Apply.
            </div>
            <div style={{ fontSize: '10px', margin: '0px 0px 20px 20px', fontWeight: 'bold' }}><u>View more</u></div>
          </div>

          <div style={{ width: '180px', color: '#fff', border: '1px groove', borderRadius: '10px', marginLeft: '15px' }}>
            <div style={{ display: 'flex', width: '180px', border: '1px groove', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              <img src={`${serverURL}/images/${'icici_sposdz.webp'}`} width='30px' height='30px' />
              <div style={{ fontSize: '10px', padding: '6px', color: '#fff' }}>JP_ICICI</div>
            </div>
            <div style={{ fontSize: '10px', padding: '20px', }} className={threedots.ellipsis_Text} >
              Rs.2000 Instant discount & upto 9 months no-cost EMI on ICICI Bank Credit Card.Discounted price inclusive
              of cashback & no – cost EMI benefit will be applied on Bank payment/OTP page. Select offer under “view all
              offers” segment on payment page to avail the benefit.IMPORTANT! To Avail this offer, please ensure this is
              the only product in your cart. T&C Apply.
            </div>
            <div style={{ fontSize: '10px', margin: '0px 0px 20px 20px', fontWeight: 'bold' }}><u>View more</u></div>
          </div>

        </div>

        <div>
          <div style={{width:'545px',height:'30px', marginTop: '20px', display: 'flex',background:'#353535',margin:'15px 0px 0px',padding:'10px 1px 10px 11px',borderRadius:'12px' }}>
            <div><LocationOnOutlinedIcon style={{ fontSize: '22px', color: '#fff' }} size='small'/></div>
            <div style={{ display: 'flex', height: '16px',flexDirection:'column' }}>
              <div style={{ fontSize: '12px', color: '#fff' }}>Delivery at: <u style={{color:'#12daa8'}}>Mumbai,400049</u></div>
              <p style={{marginTop:'1px',fontSize:'12px',color:'#fff'}}>will be delivered by tomorrow</p>           
            </div>   
          </div>        
        </div>

        <div style={{width:'460px',color:'#fff',border:'0.1px groove',margin:'15px 0px 0px',padding:'20px 74px 5px 16px',borderRadius:'12px'}}>
          {/* <h3>Key Features</h3>
          <ul>
            <li  style={{fontSize:'14px',padding:'2px'}}>Display: 6.74 inches (17.12 cm), AMOLED, 120 Hz Refresh Rate</li>
            <li style={{fontSize:'14px',padding:'2px'}}>Memory: 8GB RAM, 128GB ROM</li>
            <li style={{fontSize:'14px',padding:'2px'}}>Processor: Qualcomm Snapdragon 8 Gen 1, Octa Core, 3.2 GHz</li>
            <li style={{fontSize:'14px',padding:'2px'}}>Camera: 50 MP + 8 MP + 2MP Triple Rear & 16MP Front Camera</li>
            <li style={{fontSize:'14px',padding:'2px'}}>Battery: 5000mAh with 100W SUPERVOOC Fast Charging</li>
            <li style={{fontSize:'14px',padding:'2px'}}>USP: Face Unlock, Hyper Touch Engine</li>
          </ul> */}
          {parse(product.description)}
        </div>

        <div style={{margin:'12px 0px 10px',}}>
        <img src={`${serverURL}/images/${'PDP_ZipCare_555_4oct2023_cx1vzh.webp'}`} style={{borderRadius:'12px'}}/>
        </div>

        <div style={{width:'550px',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <img src={`${serverURL}/images/${'replaceLogo.webp'}`} style={{width:'45px',height:'45px'}}/>
        <div style={{color:'#fff',fontWeight:'bolder',fontSize:'14px',marginTop:'10px', padding:'0px 10px'}}>7 Days Easy Replace</div>
        </div>

        <div style={{margin:'17px'}}>
          <hr/>
        </div>





      </div>)
    // })
  }

  return (<div style={{ width: '100%' }}>
    {rightSpec()}

  </div>)
}