import { Button } from "@mui/material"
import { serverURL } from "../../../services/FetchNodeServices"
import PlusMinusComponent from '../components/screens/PlusMinusComponent'
import { useDispatch } from "react-redux"


export default function CartPurchaseDetailsComponent(props){

    var data = props.productCart
    console.log('aaaddaa',data)
    var dispatch = useDispatch()

    const handleQtyChange=(product,value)=>{
        if(value<=0){
          //console.log('ppp:',product,'vvvvv:',value)
            dispatch({type:'DELETE_PRODUCT',payload:[product.productdetailsid,product]})
          }
          else{
            //console.log('ppp:',product,'vvvvv:',value)
          product['qty']=value
          dispatch({type:'ADD_PRODUCT',payload:[product.productdetailsid,product]})
          }
           props.setCartRefresh(!props.cartRefresh)
        }
      

    const CartPurchase = ()=>{
        return data.map((item)=>{
            var picture=item.picture.split(',')[0]
            return (<div style={{display:'flex',height:'auto',padding:'30px 0px 10px 16px',background:'#fff',borderRadius:'1rem',margin:'2rem'}}>
                     
                        <img src={`${serverURL}/images/${picture}`} width='20%' height='20%'/>
                    
                      <div style={{width:'400px',marginLeft:'50px'}}>
                        <div style={{fontSize:'22px',color:'#121212',margin:'8px',fontWeight:'bolder'}}>
                        {item.brandname} {item.productname} {item.modelno}
                        </div>

                        <div style={{fontSize:'12px',margin:'10px'}}>                                                   
                           <div>Standard Delivery </div>
                           <div>by 25 January</div>
                           <div>2024</div>
                        </div>

                        <div style={{display:'flex',flexDirection:'row',gap:'20px',height:'40px',margin:'10px'}}>
                            <Button style={{padding:'9px 15px',border:'1px solid black',font:'12px',color:'#1d1d1d',borderRadius:'0.4rem'}}>Move to Wishlist</Button>
                            {/* <Button style={{padding:'9px 15px',font:'12px',borderRadius:'0.4rem',width:'10rem'}}>           */}
                              <PlusMinusComponent onChange={(value)=>handleQtyChange(item,value)} value={item?.qty} screen='cart' />
                            {/* </Button> */}
                        </div>
                      </div>


                     <div style={{display:'flex',flexDirection:'column',marginLeft:'auto',marginRight:'20px'}}>
                      <div style={{fontSize:'22px',color:'#121212',fontWeight:'bolder',marginLeft:'auto',}}> &#8377; {item.offerprice * item.qty}</div>
                      <div style={{fontSize:'12px',marginLeft:'auto'}}>(Inc. all Taxes)</div>
                      <div style={{  color: '#dfe6e9',  margin: '7px 0px' }}><hr /></div>
                      <div style={{fontSize:'14px',marginLeft:'auto'}}><s >MRP &#8377; {item.price * item.qty}</s></div>
                      <div style={{fontSize:'10px',marginLeft:'auto',color:'#121212'}}>(Save  &#8377; {(item.price  - item.offerprice)*item.qty})</div>
                      <div style={{  color: '#dfe6e9',width:'100px',marginLeft:'auto' }}><hr /></div>
                      

                      </div>
            </div>)
        })
    }
    return(<div>
   {CartPurchase()}
    </div>)
}