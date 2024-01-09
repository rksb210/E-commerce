import { Grid,Button,TextField, Avatar,FormHelperText } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Heading from "./projectComponent/Heading"
import categoryicon from '../../src/assets/category.png'
import { useEffect, useState } from "react"
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { getData, postData } from "../services/FetchNodeServices"
import Swal from "sweetalert2"






var useStyles=makeStyles({
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
        borderRadius:10,
        margin:10
    },
    center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }

})




export default function Products(){
    var useStyle=useStyles()

    
    const [categoryId,setCategoryId] = useState('')
    const [brandId,setBrandId] = useState('')
    const [categoryList,setCategoryList] = useState([]) 
    const [brandList,setBrandList] = useState([])    
    const [productName,setProductName] = useState('')
    const [picture,setPicture] = useState({bytes:'',filename:''})
    const [errors,setErrors] = useState({})
    


 
    const fetchAllCategory= async ()=>{
       var result = await getData('category/display_all_category')
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

  const fetchBrandsByCategory=(event)=>{
        setCategoryId(event.target.value)
        fillBrandsByCategory(event.target.value)
  }

  const fillBrandsByCategory= async(cid)=>{
    var result = await postData('brands/display_all_brands_by_category',{categoryid:cid})
    setBrandList(result.data)
  }

  const fillBrands=()=>{
    return brandList.map((item)=>{
        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
  }
    
 
    const handlePicture=(event)=>{
        setPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit= async ()=>{
        var error=validation()
        if(error===false){
        var formData = new FormData()
        formData.append('productname',productName)
        formData.append('picture',picture.bytes)
        formData.append('categoryid',categoryId)
        formData.append('brandid',brandId)
        var response = await postData('products/submit_products',formData)
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Product',
                text: response.message,
                toast:true
              })
         } 
         else{
            Swal.fire({
                icon: 'error',
                title: 'product',
                text: response.message,
                toast:true
              })
         }
    }
   }

    const handleError=(error,label)=>{
        setErrors((prev)=>({...prev,[label]:error}))
    }

    const validation=()=>{
            var error = false
            console.log('errors',errors)
            if(categoryId.length===0){
                error=true
                handleError('Please Input categoryId','categoryId')
            }
            if(brandId.length===0){
                error=true
                handleError('Please Input brandId','brandId')
            }
        
            if(productName.length===0){
                error=true
                handleError('Please Input product  name','productName')
            }
            if(picture.filename.length===0){
                error=true
                handleError('Please Select picture','picture')
            }
       
        return error
    }
    

    const handleReset = ()=>{
        setProductName('')
        setPicture({bytes:'',filename:''})
        setCategoryId('')
        setBrandId('')
    }

    return(
    <div className={useStyle.root}>
        <div className={useStyle.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="New Products" link='/dashboard/displayallproducts'/>
                </Grid>


                <Grid item xs={6}>
                    <FormControl fullWidth error={errors.categoryId}>
                        <InputLabel >Category</InputLabel>
                        <Select
                        value={categoryId}
                        label="Category"
                        onChange={fetchBrandsByCategory}                       
                        onFocus={()=>handleError('','categoryId')}>
                        {fillAllCategory()}
                        </Select>
                        <FormHelperText>{errors.categoryId} </FormHelperText>
                </FormControl> 
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth error={errors.brandId}>
                        <InputLabel >Brands</InputLabel>
                        <Select
                        value={brandId}
                        label="Brand"
                        onChange={(event)=>setBrandId(event.target.value)}                      
                        onFocus={()=>handleError('','brandId')}>
                        {fillBrands()}
                        </Select>
                        <FormHelperText>{errors.brandId}</FormHelperText>
                        </FormControl> 
                </Grid>

                <Grid item xs={12} >
                    <TextField value={productName} label='Product Name' fullWidth  
                       onChange={(event)=>setProductName(event.target.value)}
                       onFocus={()=>handleError('','productName')}
                       error={errors.productName}
                       helperText={errors.productName}
                     />
                </Grid>

                <Grid item xs={6}>
                    <FormControl error={errors.picture}>
                    <Button component='label' variant="contained" fullWidth >
                        <input type="file" hidden accept="images/*" multiple 
                        onChange={handlePicture}  onFocus={()=>handleError('','picture')}
                        
                        />
                        Product Image
                    </Button>
                    <FormHelperText>{errors.picture} </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={6} className={useStyle.center}>
                        <Avatar src={picture.filename}  alt="Product"/>
                        
                </Grid>

                <Grid item xs={6}>
                    <Button  variant="contained" fullWidth onClick={handleSubmit}>
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