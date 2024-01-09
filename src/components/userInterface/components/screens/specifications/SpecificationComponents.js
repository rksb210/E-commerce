import Header from "../../Header";
import LeftSpecComponent from "./LeftSpecComponent";
import MiddleSpecComponent from "./MiddleSpecComponent";
import RightSpecComponent from "./RightSpecComponent";
import { useStyles } from "../ProjectCss";
import BuyNow from "./BuyNowComponent";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SpecificationComponent(props) {
    var classes = useStyles()
    var location = useLocation()
    
    var p = location.state.product

    const [refresh,setRefresh] = useState(false)
    const [product,setProduct] = useState(p)
    
    return (<div className={classes.home_root} >

        <div style={{ position: 'sticky', top: 0, zIndex: 2 }}><Header /></div>
        <div style={{ display: 'flex', width: '100%' }}>

            <div style={{ width: '50%' }}>
                <div style={{ width: '100dvh', alignItems: 'start', position: 'sticky', top: 69, display: 'flex' }}><LeftSpecComponent product={product}/></div>
            </div>
            <div style={{ width: '50%' }}><RightSpecComponent  setProduct={setProduct} product={product} refresh={refresh} setRefresh={setRefresh}/></div>
            
        </div>
        {/* <div><BuyNow /></div> */}
    </div>)
}