import Header from "../Header";
import DeliveryAddress from "./user/DeliveryAddressComponent";
import MyProfileComponent from "./user/MyProfileComponent";
import { useLocation } from "react-router-dom";

export default function Shopping(){

    var location = useLocation()
    var mobilenumber = location?.state?.mobilenumber
    var status = location.state.status
    var userData = location.state.user

    return (<div>
        {status?<div><DeliveryAddress userData={userData} /></div>:
        <div><MyProfileComponent mobilenumber={mobilenumber} /></div>}
       
    </div>)
}