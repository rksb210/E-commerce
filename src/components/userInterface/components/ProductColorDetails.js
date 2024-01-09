import { useState,useEffect } from "react"
import { serverURL,getData,postData } from "../../../services/FetchNodeServices"
import { Button } from "@mui/material"

export default function ProductColorDetails(props){
  
 var product = props.product
    const [details,setDetails]=useState([])
    const [selectedID,setSelectedID] = useState(props.product.productdetailsid)
    //  const [product,setProduct] = useState(props.product)
  
    const fetchProductDetails= async ()=>{
      var result = await postData('userinterface/display_all_productdetails_by_productid',{productid:product.productid})
      setDetails(result.data)
      console.log('rrrr',result.data)
      props.setRefresh(!props.refresh)
  }
  
    useEffect(function(){       
      fetchProductDetails()          
    },[])

    
    const showDetails=()=>{
        return details.map((item)=>{
          return(
          <div style={{ }}>           
            <div onClick={()=>fetchDetails(item?.productdetailsid)}>
            <Button style={{border:selectedID==item.productdetailsid?'1px solid #12daa8':'1px solid gray'  , padding: '8px 10px 6px', fontSize: '12px', color: '#fff',width:'5rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>{item.color}</Button>
            </div>
           
            
            {/* <div style={{ background: '#000', border: '1px solid #12daa8', padding: '8px 10px 6px', fontSize: '12px', color: '#fff', height: '1.5rem', marginLeft: '5.5%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%' }}>Galatic Silver</div> */}
          </div>

        )
        })
      } 

      const fetchDetails= async (id)=>{
        var result = await postData('userinterface/display_productdetails_by_id',{productdetailsid:id})
        // setProduct(result.data[0])
        props.setProduct(result.data[0])
        setSelectedID(result.data[0].productdetailsid)
       
    }
    return(<div  style={{ width: '100%',display:'flex',flexDirection:'row',gap:'30px' }}>
            {showDetails()}
    </div>)
}