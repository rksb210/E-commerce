import ApplyCoupon from "../ApplyCouponComponent"
import CartPurchaseDetailsComponent from "../CartPurchaseDetailsComponent"
import DeliveryOption from "../DeliveryOptionComponent"
import Header from "../Header"
import CheckoutComponent from "../CheckoutComponent"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function Cart() { 

    const [cartRefresh,setCartRefresh] = useState(false)

    var cart = useSelector(state=>state.myCart)
    var productCart = Object.values(cart)
    return (<div style={{ background: '#f9f9f9', width: '100%', height: '100%' }}>
        <div><Header /></div>
        <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '8%', marginTop: '5%', width: '50%' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>Your Cart</div>
                <div><ApplyCoupon /></div>
                <div><CartPurchaseDetailsComponent productCart={productCart} cartRefresh={cartRefresh} setCartRefresh={setCartRefresh}/></div>
            </div>

          <div style={{marginTop:'8%',marginLeft: '2rem'}}>
            <div><DeliveryOption /></div>
            <div><CheckoutComponent  productCart={productCart}  title={'Checkout'} /></div>
            </div>
        </div>
    </div>)
}