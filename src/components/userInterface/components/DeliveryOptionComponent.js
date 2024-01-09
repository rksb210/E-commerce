import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AllInboxSharpIcon from '@mui/icons-material/AllInboxSharp';

export default function DeliveryOption() {
    const [value, setValue] = useState('normal');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (<div>
    <div style={{ width: '70%', height: '45%', background: '#fff', padding: '5px 5px ', borderRadius: '0.5rem' }}>
        <div style={{ display: 'flex' }}>
            <p style={{ display: 'flex', fontWeight: 'bolder' }}> Delivery options for
                <span style={{ color: '#088466', marginLeft: '0.5rem' }}> 474004</span>
                <u style={{ marginLeft: '80px', color: '#088466' }}>Change</u>
            </p>
        </div>

        <div>
            <RadioGroup
                
                value={value}
                onChange={handleChange}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '25px'}}><FormControlLabel value="normal" control={<Radio style={{ color: '#12daa8' }} />} /></span>
                    <span style={{ width: '2rem'}}><LocalShippingIcon style={{}} /></span>
                    <div>
                        <div style={{ fontWeight: 'bolder', fontSize: '13px', marginTop: '8px' }}>Express Delivery</div>
                        <div style={{ fontSize: '12px' }}>Order within <span style={{ color: '#7f5aed' }}>8hr 25min</span> </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '25px' }}><FormControlLabel value="standard" control={<Radio style={{ color: '#12daa8' }} />} /></span>
                    <span style={{ width: '2rem' }}><AllInboxSharpIcon /></span>
                    <div>
                        <div style={{ fontWeight: 'bolder', fontSize: '13px' }}>Standard Deliver by Today</div>
                    </div>
                </div>
            </RadioGroup>
        </div>
        </div>
        <div style={{marginTop:'1rem'}}>
          <div style={{color:'#c72d3a',fontSize:'13px',background:'pink',padding:'0.5rem',fontWeight:'bold',lineHeight:'normal',width:'70%',borderRadius:'0.5rem'}}>One or more products in your cart are not available for the delivery mode selected.</div>
        </div>
    </div>)
}