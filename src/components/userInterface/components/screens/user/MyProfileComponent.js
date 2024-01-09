import { Button, FormControlLabel, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material'
import Header from '../../Header'

import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { postData } from '../../../../../services/FetchNodeServices';
import { useLocation } from 'react-router-dom';
import DeliveryAddress from './DeliveryAddressComponent';
import { useDispatch } from 'react-redux';

export default function MyProfileComponent(props) {

    var dispatch = useDispatch()
    // var location = useLocation()
    // var mobilenumber = location.state.mobilenumber
    // var status = location.state.status
    // var userData = location.state.user


    const [firstName,setFirstName] = useState('')
    const [mobileNumber,setMobileNumber] = useState(props.mobilenumber)
    const [emailId,setEmailId] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [pincode,setPincode] = useState('')

    

    const handleClick = async () =>{
        var body = {firstname:firstName,emailid:emailId,mobilenumber:mobileNumber,address:`${address1},${address2},${state},${city}`,pincode:pincode}

        var response = await postData('useraccount/submit_user_data',body)
        if(response.status){
            dispatch({type:'ADD_USER',payload:[mobileNumber,body]})
            localStorage.setItem("User",JSON.stringify(body))
        }
        else{
            alert('Something went wrong')
        }
    }

    

    return (
    <div style={{ width: '100%', height: '100%', background: '#191919' }}>
        <div>
            <Header />
        </div>

        <div style={{ margin: '20px 100px', padding: '35px 40px 50px' }}>
            <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bolder' }}>
                My Profile Page
            </div>

            <Grid container style={{ padding: '14px 22px', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                <Grid item xs={5}>
                    <label style={{ color: 'white' }}>Title </label>
                        <Select style={{border:'1px solid white',color:'white',marginTop:'0.5rem',borderRadius:'0.5rem'}}   sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }}} fullWidth                          
                        >
                            <MenuItem value='1'>Mr.</MenuItem>
                            <MenuItem value='2' >Mrs.</MenuItem>
                            <MenuItem value='3' >Miss</MenuItem>
                            <MenuItem value='4' >Dr.</MenuItem>
                            <MenuItem value='5' >Prof.</MenuItem>
                        </Select>
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>First Name * </label>
                    <TextField placeholder='First Name' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    onChange={(event)=>setFirstName(event.target.value)} />
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Middle Name</label>
                    <TextField placeholder='Middle Name' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }} 
                    />
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white', marginBottom: '2rem' }}>Last Name</label>
                    <TextField placeholder='Last Name' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }} />
                </Grid>

                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: '#fff' }}>Gender</FormLabel>
                        <RadioGroup
                            row
                            style={{ display: 'flex', flexDirection: 'row', gap: '5rem', color: '#fff' }}
                        >
                            <FormControlLabel value="female" control={<Radio style={{ color: '#12daa8' }} />} label="Female" />
                            <FormControlLabel value="male" control={<Radio style={{ color: '#12daa8' }} />} label="Male" />
                            <FormControlLabel value="transgender" control={<Radio style={{ color: '#12daa8' }} />} label="Transgender" />
                            <FormControlLabel value="other" control={<Radio style={{ color: '#12daa8' }} />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Mobile Number *</label>
                    <TextField placeholder='Mobile Number' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    onChange={(event)=>setMobileNumber(event.target.value)} 
                    value={mobileNumber} />
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Email Id *</label>
                    <TextField placeholder='Email Id' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }} 
                    onChange={(event)=>setEmailId(event.target.value)} />
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Address 1</label>
                    <TextField placeholder='Address 1' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    onChange={(event)=>setAddress1(event.target.value)}  />
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Address 2</label>
                    <TextField placeholder='Address 2' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    onChange={(event)=>setAddress2(event.target.value)}  />
                </Grid>

                <Grid item xs={5} fullWidth >
                    <label style={{ color: 'white' }}>State</label>
                    <Select style={{marginTop:'1rem',border:'1px solid white',color:'white',borderRadius:'0.5rem'}}  sx={{"& fieldset":{border:'none'} , input:{color:'black'} , icon:{fill:'white'}}} fullWidth
                    onChange={(event)=>setState(event.target.value)} >
                        <MenuItem value='19'>M.P.</MenuItem>
                        <MenuItem value='18'>U.P.</MenuItem>
                        <MenuItem value='17'>Delhi</MenuItem>
                        <MenuItem value='20'>Gujrat</MenuItem>
                        <MenuItem value='21'>Haryana</MenuItem>
                        <MenuItem value='22'>Tamil Nadu</MenuItem>

                    </Select>
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white'}}>City</label>
                    <Select style={{marginTop:'1rem',border:'1px solid white',color:'white',borderRadius:'0.5rem'}}  sx={{"& fieldset":{border:'none'} , input:{color:'black'},}} fullWidth
                    onChange={(event)=>setCity(event.target.value)} >
                        <MenuItem value='10'>Gwalior</MenuItem>
                        <MenuItem value='11'>U.P.</MenuItem>
                        <MenuItem value='12'>Delhi</MenuItem>
                        <MenuItem value='13'>Gujrat</MenuItem>
                        <MenuItem value='14'>Haryana</MenuItem>
                        <MenuItem value='14'>Tamil Nadu</MenuItem>

                    </Select>
                </Grid>

                <Grid item xs={5} >
                    <label style={{ color: 'white' }}>Pincode</label>
                    <TextField placeholder='Email Id' fullWidth sx={{ "& fieldset": { border: 'none' }, input: { color: '#333' }, background: '#F6F6F6', marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    onChange={(event)=>setPincode(event.target.value)}  />
                </Grid>

                <Grid item xs={5} style={{display:'flex',flexDirection:'row',gap:'2rem' , height:'3.5rem',marginTop:'1.8rem'}} >
                    <Button fullWidth style={{background:'#12daa8',borderRadius:'0.5rem',color:'#fff'}}
                     onClick={handleClick}>
                        Save
                    </Button>
                    <Button fullWidth style={{background:'',borderRadius:'0.5rem',color:'#fff',border:'1px solid #F6F6F6'}}>Discard</Button>
                </Grid>


            </Grid>
        </div>
        


    </div>)
}