import {Grid,Button,TextField,Avatar} from "@mui/material";
import { makeStyles } from  "@mui/styles";
import { useEffect, useState } from "react";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import Heading from "./projectComponent/Heading";
import categoryicon from '../../src/assets/category.png'
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";


var useStyles = makeStyles({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center'
    },
    box:{
        width:500,
        height:320,
        background:'#f1f2f6',
        padding:10,
        margin:10,
        borderRadius:10

    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default function Brands(){
    var useStyle = useStyles()
    const [brandName,setBrandName] = useState('')
    const [logo,setLogo] = useState({bytes:"",filename:""})
    const [errors,setErrors] = useState({})
    const [categoryId,setCategoryId] = useState('')
    const [categoryList,setCategoryList] = useState([])
    



    const fetchAllCategory = async ()=>{
        var result = await getData('category/display_all_category') 
        console.log('result:-',result)
        setCategoryList(result.data)
    }

    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handlelogo = (event) =>{
        setLogo({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit = async () =>{
       var error = validation()
       if(error===false){
        var formData = new FormData()
        formData.append('brandname',brandName)      
        formData.append('logo',logo.bytes)
        formData.append('categoryid',categoryId)
        var response = await postData('brands/submit_brands',formData)
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Brand',
                text: response.message,
                toast:true
              })
         } 
         else{
            Swal.fire({
                icon: 'error',
                title: 'Brand',
                text: response.message,
                toast:true
              })
         }
       }
    }

    const handleError = (error,label) => {
        setErrors((prev)=>({...prev,[label]:error}))
    }

    const validation = ()=>{
        var error = false
        if(brandName.length===0){
            error=true
            handleError('plz input brand name','brandName')
        }
        if(logo.filename.length===0){
            error=true
            handleError('plz select logo','logo')
        }
        return error
    }

    const handleReset = () => {
        setBrandName("")
        setLogo({bytes:"",filename:""})
    }
    return(
    <div className={useStyle.root}>
        <div className={useStyle.box}>

            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="New Brands" link="/dashboard/displayallbrands"/>
                </Grid>

                <Grid item xs={12}>
                <FormControl fullWidth>
                        <InputLabel >Category</InputLabel>
                        <Select
                        value={categoryId}
                        label="Category"
                        onChange={(event)=>setCategoryId(event.target.value)}
                        >
                        {fillAllCategory()}
                        </Select>
                </FormControl> 
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Brand Name" fullWidth 
                    onChange={(event)=>setBrandName(event.target.value)} 
                    onFocus={()=>handleError("",'brandName')} 
                    error={errors.brandName}
                    helperText={errors.brandName}
                    value={brandName}/>
                </Grid>

                <Grid item xs={6}> 
                    <Button component="label" variant="contained" fullWidth onFocus={()=>handleError('','logo')} >
                        <input hidden type="file" accept="images/*" multiple onChange={handlelogo}/>
                        Brand Image
                    </Button>
                    <div style={{color:'#d32f2f',fontSize:13,marginLeft:10,marginTop:6}}>{errors.logo}</div>
                </Grid>

                <Grid item xs={6} className={useStyle.center}>
                        <Avatar src={logo.filename} alt="brand image" variant="rounded" />
                </Grid>

                <Grid item xs={6}> 
                    <Button variant="contained" fullWidth onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>

                <Grid item xs={6}> 
                    <Button  variant="contained" fullWidth onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>

            </Grid>
        </div>
        
    </div>)
}