import { Button } from "@mui/material";
import LoginComponent from "./screens/user/LoginComponent";
import { useState } from "react";
import OtpComponent from "./screens/user/OtpComponent";
import useRazorpay from "react-razorpay";
import { postData, serverURL } from "../../../services/FetchNodeServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CheckoutComponent(props) {

  var navigate = useNavigate()

    const [status,setStatus] = useState(false)
    const [Razorpay] = useRazorpay();
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    console.log("kkkkk:",userData)

    var data = props.productCart
    console.log('tttttttt',data.qty)
    var originalAmount = data.reduce((p1,p2)=>{
        return p1+(p2.price*p2.qty)
    },0)
    var actualAmount = data.reduce((p1,p2)=>{
        return p1+(p2.offerprice*p2.qty)
    },0)

    var yousave = originalAmount - actualAmount

    var quantity = data.reduce((p1,p2)=>{
        return(parseInt(p1+p2.qty))
    },0)


   

    const handleClick=()=>{
      var userData = JSON.parse(localStorage.getItem("User"))
      if(userData){
        navigate('/profile',{state:{mobilenumber:userData?.mobilenumber,status:true,user:[userData]}})
      }
      else{
        setStatus(true)
      }
    }

   

    
       
      
        const options = {
          key: "rzp_test_GQ6XaPC6gMPNwH",  // Enter the Key ID generated from the Dashboard
          amount: actualAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Electronics Hub",
          description: "Test Transaction",
          image: `${serverURL}/images/croma.webp`,
         
          handler: async function (response) {
            alert(response.razorpay_payment_id);
           
            alert(response.razorpay_signature);
            var body = {cart:data,user:userData,paymentstatus:response.razorpay_payment_id}
            var result = await postData('userinterface/order_submit',body)
            if(result.status){
              alert('order submitted')

            }
            else{
              alert('not submitted')
            }
            navigate('/home')
          },
          prefill: {
            name: userData?.username,
            email: userData?.emailid,
            contact: userData?.mobilenumber,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const handlePayment = async (params) => {
            const rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
             
              alert(response.error.metadata.payment_id);
            });
          
            rzp1.open();
        }

    return (<div style={{ background: '#fff', height: 'auto', padding: '18px', width: '66%', marginTop: '2rem', borderRadius: '0.5rem' }}>
        <div style={{ fontSize: '21.6px', fontWeight: 'bolder', margin: '0px 0px 10px' }}>Order Summary ( Total {quantity} items)</div>
        <div style={{ marginTop: '1rem', color: '#121212', display: 'flex' }}> Original Price
            <div style={{ marginLeft: 'auto' }}>&#8377; {originalAmount}</div>
        </div>
        <div style={{ marginTop: '1rem', color: '#121212', display: 'flex' }}> Amount to saved
            <div style={{ marginLeft: 'auto' }}>&#8377; {yousave}</div>
        </div>
        <div style={{ marginTop: '1rem', color: '#121212', display: 'flex',alignItems:'center' }}>Delivery
            <s style={{ marginLeft: 'auto' }}>&#8377; 60 </s><span style={{marginLeft:'2px',fontSize:'12px'}}> Free</span> 
        </div>
        <div style={{ marginTop: '1rem', color: '#121212', display: 'flex' }}>Total
            <div style={{ marginLeft: 'auto' }}>&#8377; {actualAmount}</div>
        </div>

       {props.title=='Checkout'?
        <Button onClick={handleClick} style={{background:'#12daa8',color:'#000',marginTop:'1.5rem'}} fullWidth>Checkout</Button>
        :
        <Button onClick={handlePayment} style={{background:'#12daa8',color:'#000',marginTop:'1.5rem'}} fullWidth>Proceed to Payment</Button>
}
        <LoginComponent status={status} setStatus={setStatus}/>
        
    </div>)
}