import { CheckBox } from '@mui/icons-material';
import { Button, DialogContentText, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent({status,setStatus}) {

    const [mobileNumber,setMobileNumber] = useState('')
    

    var navigate = useNavigate()
    
       const handleClick=()=>{
       var otp = generateOtp()
       alert(otp)
       navigate('/otp',{state:{otp:otp,mobilenumber:mobileNumber}})
  }

  const generateOtp=()=>{
    var otp = parseInt((Math.random()*8999) + 1000)
    return otp
  }

    

    const loginForm = () => {
        return (<div style={{ background: '#000', color: '#fff', padding: '21px 42px' }}>

            <div style={{ width: '350px', display: 'flex', justifyContent: 'space-evenly', border: '1px solid #353535', margin: '15px 3px 0px 0px', padding: '14px 33px 14px 77px ' }}>
                <span style={{ fontSize: '14px' }}>Login</span>
                <span style={{ border: '1px solid white', borderRadius: '0.1rem', }}>
                    <span style={{ fontSize: '14px', margin: '5px' }}>OR</span>
                </span>
                <span style={{ fontSize: '14px' }}>Create Account</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', marginTop: '1rem' }}>Please enter your Email Id or Phone number</div>

            <div>
                <TextField placeholder='Enter your Email Id or Phone Number' style={{ color: '#fff', border: '1px solid #353535', width: '100%', height: '45px', background: '#000', marginTop: '1.5rem', borderRadius: '0.5rem', borderLeft: '1px solid #353535', borderRight: '1px solid #353535', borderBottom: '1px solid white', fontSize: '20px' , }} sx={{input:{color:'white'},"& fieldset":{border:'none'}}}
                onChange={(event)=>setMobileNumber(event.target.value)}/>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', }}><CheckBox style={{ color: '#12daa8' }} />Keep me Sign in</div>

            <div style={{ fontWeight: '10px', marginTop: '2rem' }}>By continuing you agree to your <u style={{ color: '#12daa8' }}>Terms of use</u> & <u style={{ color: '#12daa8' }}>Privacy Policy</u></div>

            <Button onClick={handleClick} fullWidth style={{ background: '#12daa8', color: 'black', marginTop: '1.5rem', height: '3rem', borderRadius: '0.5rem' }}>Continue</Button>

        </div>)
    }
    return (<div>
        <Dialog open={status} style={{ borderRadius: '0.5rem',backdropFilter:'blur(3)' }}>
            <DialogContentText>
                {loginForm()}
            </DialogContentText>
        </Dialog>
    </div>)
}