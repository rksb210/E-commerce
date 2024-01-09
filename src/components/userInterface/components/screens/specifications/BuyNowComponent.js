import { Paper } from "@mui/material"
import { serverURL } from "../../../../../services/FetchNodeServices"

export default function BuyNow() {

    var data = [{ id: 0, productname: 'OnePlus', ram: '8gb', color: 'black', price: '42,000', offerprice: '39,900' }]

    const buyNow = () => {
        return data.map((item) => {
            return (<Paper elevation={10} style={{ background: '#191919', color: '#fff',display:'flex',height:'1%',padding:'0px 50px',boxShadow:'0 -7 20 -10 #fff', position: 'sticky', bottom: 0, zIndex: 2  }}>

                <div style={{display:'flex',justifyContent:'center',margin:'14px 20px 20px 200px'}}>
                    <img src={`${serverURL}/images/${'m1.webp'}`} style={{ width: '35px',height:'35px' }} />
                </div>

                <div style={{display:'flex',flexDirection:'column',margin:'10px '}}>
                    <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>{`${item.productname} (${item.ram} ${item.color}) `}</div>
                    <div style={{}}>&#8377; {`${item.price}`}</div>
                </div>
                
                <div style={{marginLeft:'400px',display:'flex',justifyContent:'center',alignItems:'center',}}>
                <div style={{color:'#191919',background:'#12daa8',fontSize:'16px',fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',padding:'12px 28px',borderRadius:'8px',marginLeft:'15px'}}>Buy Now </div>
                <div  style={{color:'#fff',background:'#353535',fontSize:'16px',fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',padding:'12px 28px',borderRadius:'8px',marginLeft:'15px'}}>Add to Cart</div>
                </div>
            </Paper>)
        })
    }
    return (<div>
        {buyNow()}
    </div>)
}