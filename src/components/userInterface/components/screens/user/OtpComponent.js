import { CheckBox } from '@mui/icons-material';
import { Button, DialogContentText, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../../../services/FetchNodeServices';
import { useDispatch } from 'react-redux';

export default function OtpComponent(){

    var location = useLocation()
    var navigate = useNavigate()
    var dispatch = useDispatch()
    var oldOtp = location?.state?.otp
    var mobilenumber = location?.state?.mobilenumber
    // alert(mobilenumber)

    const [open, setOpen] = useState(true)

    var otpArray = new Array(4)
    otpArray.fill('')

    const handleCheckOtp=async ()=>{
        var otp = otpArray.join('')
        if(oldOtp==otp){
            var response = await postData('useraccount/check_account',{mobilenumber:mobilenumber})
            if(response.status){
                dispatch({type:'ADD_USER',payload:[response.data[0].mobilenumber,response.data[0]]})
                localStorage.setItem("User",JSON.stringify(response.data[0]))
                navigate('/profile',{state:{mobilenumber:mobilenumber,status:response.status,user:response.data}})
            }
            else{
                navigate('/profile',{state:{mobilenumber:mobilenumber,status:response.status,user:[]}})
            }           
        }
        else{
            alert('Invalid otp')
        }
       
        
    }

    const handleOtp1=()=>{
        if(document.getElementById('one').value.length==1){
            otpArray[0]=document.getElementById('one').value
            document.getElementById('two').focus()
        }
    }
    const handleOtp2=()=>{
        if(document.getElementById('two').value.length==1){
            otpArray[1]=document.getElementById('two').value
            document.getElementById('three').focus()
        }
    }
    const handleOtp3=()=>{
        if(document.getElementById('three').value.length==1){
            otpArray[2]=document.getElementById('three').value
            document.getElementById('four').focus()
        }
    }
    const handleOtp4=()=>{
        if(document.getElementById('four').value.length==1){
            otpArray[3]=document.getElementById('four').value
        }
    }


    const otpDialog = () => {
        return (<div>
            <Dialog open={open} style={{backdropFilter:'blur(3px)'}}>
                <DialogContentText>
                    {otpForm()}
                </DialogContentText>
            </Dialog>
        </div>)
    }

    const otpForm=()=>{
        return(
            <div style={{background:'#191919',padding:'31px 52px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'300px',width:'400px',borderRadius:'0.3rem'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <div style={{color:'#fff',fontSize:'18px',fontWeight:'bolder'}}>VERIFY WITH OTP </div>
                    <div style={{color:'#fff',fontSize:'12px',marginTop:'1rem'}}>Sent to +91 {mobilenumber}</div>
                </div>

                <div style={{display:'flex',margin:'10px',flexDirection:'row',gap:'15px',borderRadius:'1.5rem'}}>
                    <div style={{width:'50px',border:'1px solid #fff',borderRadius:'0.5rem',color:'#fff'}}>
                        <TextField onKeyUp={handleOtp1} id='one' sx={{"& fieldset":{border:'none'} , input:{color:'white',textAlign:'center'} }} />
                    </div>
                    <div style={{width:'50px',border:'1px solid #fff',borderRadius:'0.5rem'}}>
                        <TextField  onKeyUp={handleOtp2} id='two' sx={{"& fieldset":{border:'none'}, input:{color:'white',textAlign:'center'}}} />
                    </div>
                    <div style={{width:'50px',border:'1px solid #fff',borderRadius:'0.5rem'}}>
                        <TextField  onKeyUp={handleOtp3} id='three' sx={{"& fieldset":{border:'none'}, input:{color:'white',textAlign:'center'}}} />
                    </div>
                    <div style={{width:'50px',border:'1px solid #fff',borderRadius:'0.5rem'}}>
                        <TextField  onKeyUp={handleOtp4} id='four' sx={{"& fieldset":{border:'none'}, input:{color:'white',textAlign:'center'}}} />
                    </div>

                </div>

                <div style={{color:'#fff',marginTop:'1.5rem'}}>
                    Didn't Recieve Your OTP? <u style={{color:'#12daa8'}}>Resend OTP</u>
                </div>

                <div style={{width:'350px',marginTop:'1.5rem'}}>
                    <Button onClick={handleCheckOtp} fullWidth style={{background:'#12daa8',color:'#000'}} >Submit OTP</Button>
                </div>
            </div>
        )
    }
    return(<div>
        
       {otpDialog()}
       
    </div>)
}