import { useState, useEffect } from "react"
import { Button, Fab } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

export default function PlusMinusComponent(props) {

    var navigate = useNavigate()
    const [count, setCount] = useState(0)

    useEffect(function () {
        setCount(props.value)
    }, [props])

    const handleAdd = () => {
        var c = count + 1
        setCount(c)
        props.onChange(c)
    }

    const handleMinus = () => {
        var c = count - 1
        if (c >= 0) {
            setCount(c)
            props.onChange(c)
        }
    }

    const handleContinueShopping=()=>{
        navigate('/home')
    }

    return (<div>
        {count == 0 ?
            <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
                <Button onClick={handleAdd} style={{ background: '#12daa8', color: '#000', padding: '10px', width: '20%', borderRadius: '0.5rem' }}>Add to cart</Button>
                <Button style={{ background: '#12daa8', color: '#000', width: '20%', borderRadius: '0.5rem' }}>Buy Now</Button>
            </div> :


           <div style={{width:'50%', display:'flex',flexDirection:'row',gap:'70px'}}>
            <div style={{ width: '120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Fab color="primary" size='small' onClick={handleMinus} style={{ background: '#12daa8', color: '#000' , zIndex:0 }}>
                    <RemoveIcon fontSize="small" />
                </Fab>
                <div style={{ fontWeight: 500, color:props.screen=='cart'?'#000': '#fff',fontSize:'20px',marginLeft:'0.5rem',marginRight:'0.5rem' }}>{count}</div>
                <Fab color="primary" size='small' onClick={handleAdd} style={{ background: '#12daa8', color: '#000' , zIndex:0 }}>
                    <AddIcon fontSize="small" />
                </Fab>
                

            </div>
            {props.screen=='cart'?<></>:
            <Button onClick={handleContinueShopping}  style={{background:'#12daa8',color:'#000',borderRadius:'0.5rem'}}>Continue Shopping</Button>}
            </div>
        }
    </div>)
}