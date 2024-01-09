import list from "../../assets/list.png"
import { useNavigate } from "react-router-dom"

export default function Heading(props){ 
    var navigate = useNavigate()
    return(<div style={{display:'flex',flexDirection:'row'}}>
                <div>
                    <img alt="image" src={props.image} width='25'/>
                </div>
                <div style={{fontFamily:'dosis',fontWeight:'bold',fontSize:18,paddingLeft:5}}>
                    {props.caption}
                </div>
                <div style={{marginLeft:'auto',cursor:'pointer'}} onClick={()=>navigate(props.link)}>
                    <img alt="" src={list} width="25"/>
                </div>
    </div>)
}