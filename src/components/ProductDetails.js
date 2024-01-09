// import { Grid,Button,TextField,Avatar, FormLabel, RadioGroup,Radio } from "@mui/material"
// import { makeStyles } from "@mui/styles"
// import {FormControl,InputLabel,Select,MenuItem,FormControlLabel,FormHelperText} from "@mui/material";
// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Input } from "@mui/icons-material";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Heading from "./projectComponent/Heading"
// import categoryicon from '../../src/assets/category.png'
// import { getData, postData } from "../services/FetchNodeServices";
// import Swal from "sweetalert2";


// var useStates = makeStyles({
//     root:{
//         height:'100%',
//         width:'100vw',
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center'
        
//     },
//     box:{
//         height:'auto',
//         width:800,
//         display:'flex',
//         justifyContent:'center',
//         background:'#f1f2f6',
//         padding:10,
//         borderRadius:10,
//         margin:10,        
//     },
//     center:{
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'center'
//     }

// }) 



// export default function ProductDetails(){
//     var useStyle=useStates()

//     const [categoryList,setCategoryList] = useState([])
//     const [brandList,setBrandList] = useState([])
//     const [productList,setProductList] = useState([])
//     const [brandId,setBrandId] = useState('')
//     const [productId,setProductId] = useState('')
//     const [categoryId,setCategoryId] = useState('')
//     const [modelNumber,setModelNumber] = useState('')
//     const [color,setColor] = useState('')
//     const [description,setDescription] = useState('')
//     const [price,setPrice] = useState('')
//     const [offerPrice,setOfferPrice] = useState('')
//     const [stock,setStock] = useState('')
//     const [hsnCode,setHSNCode] = useState('')
//     const [status,setStatus] = useState('')
//     const [picture,setPicture] = useState({bytes:'',filename:''})
//     const [errors,setErrors] = useState({})
    

    
//     const fetchAllCategory= async ()=>{
//         var response = await getData('category/display_all_category')
//         setCategoryList(response.data)
//     }
//     useEffect(function(){
//         fetchAllCategory()
//     },[])
//     const fillAllCategory=()=>{
//         return categoryList.map((item)=>{
//             return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
//         })
//     }

//     const fetchBrandsByCategory=(event)=>{
//         setCategoryId(event.target.value)
//             fillBrandsByCategory(event.target.value)
//     }
//     const fillBrandsByCategory= async (cid)=>{
//             var response = await postData('brands/display_all_brands_by_category',{categoryid:cid})
//             setBrandList(response.data)
//     }
//     const fillBrands=()=>{
//         return brandList.map((item)=>{
//             return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
//         })
//     }

//     const fetchProductsByBrands=(event)=>{      
//         setBrandId(event.target.value)
//         fillProductsByBrands(event.target.value)
//     }
//     const fillProductsByBrands=async(bid)=>{
//         var response = await postData('products/display_all_products_by_brands',{brandid:bid})
//         setProductList(response.data)
//     }
//     const fillProducts=()=>{
//         return productList.map((item)=>{
//             return <MenuItem value={item.productid}>{item.productname}</MenuItem>
//         })
//     }

//     const handlePicture=(event)=>{
//         setPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
//     }

//     const handleReset=()=>{
//         setCategoryId('')
//         setBrandId('')
//         setProductId('')
//         setModelNumber('')
//         setColor('')
//         setDescription('')
//         setPrice('')
//         setOfferPrice('')
//         setStock('')
//         setHSNCode('')
//         setStatus('')
//         setPicture({bytes:'',filename:''})
//     }

//     const handleSubmit= async()=>{
//       var formData = new FormData()
//       var error=validation()
//         if(error===false){
//         formData.append('categoryid',categoryId)
//         formData.append('brandid',brandId)
//         formData.append('productid',productId)
//         formData.append('modelnumber',modelNumber)
//         formData.append('color',color)
//         formData.append('description',description)
//         formData.append('price',price)
//         formData.append('offerprice',offerPrice)
//         formData.append('stock',stock)
//         formData.append('hsncode',hsnCode)
//         formData.append('status',status)
//         formData.append('picture',picture.bytes)

//         var response = await postData('productdetails/submit_productdetails',formData)
//         console.log('response:',response)
//         if(response.status){
//             Swal.fire({
//                 icon: 'success',
//                 title: 'ProductDetails',
//                 text: response.message,
//                 toast:true
//               })
//         }
//         else{
//             Swal.fire({
//                 icon: 'error',
//                 title: 'ProductDetails',
//                 text: response.message,
//                 toast:true
//               })
//         }
//     }
//     }

//     const handleError=(error,label)=>{
//         setErrors((prev)=>({...prev,[label]:error}))
//     }
//     const validation=()=>{
//       var error=false
//         if(categoryId.length===0){
//             error=true
//             handleError('Please input category id','categoryId')
//         }
//         if(brandId.length===0){
//             error=true
//             handleError('Please input brand id','brandId')
//         }
//         if(productId.length===0){
//             error=true
//             handleError('Please input product id','productId')
//         }
//         if(modelNumber.length===0){
//             error=true
//             handleError('Please input model number','modelNumber')
//         }
//         if(color.length===0){
//             error=true
//             handleError('Please input color','color')
//         }
//         if(description.length===0){
//             error=true
//             handleError('Please input description','description')
//         }
//         if(price.length===0){
//             error=true
//             handleError('Please input price','price')
//         }
//         if(offerPrice.length===0){
//             error=true
//             handleError('Please input offerprice','offerprice')
//         }
//         if(stock.length===0){
//             error=true
//             handleError('Please input stock','stock')
//         }
//         if(hsnCode.length===0){
//             error=true
//             handleError('Please input hsn code','hsnCode')
//         }
//         if(status.length===0){
//             error=true
//             handleError('Please input status','status')
//         }
//         if(picture.filename.length===0){
//             error=true
//             handleError('Please input picture','picture')
//         }
//         return error
//     }
    

//     return (
//         <div className={useStyle.root}>
//             <div className={useStyle.box}>
//                 <Grid container spacing={3}>

//                 <Grid item xs={12}>
//                     <Heading image={categoryicon} caption="Add Product Details" link='/displayallproductdetails'/>
//                 </Grid>

//                     <Grid item xs={4}>
//                         <FormControl fullWidth   error={errors.categoryId}>
//                             <InputLabel>Category Id</InputLabel>
//                             <Select label='Category Id'
//                                 onChange={fetchBrandsByCategory}
//                                 value={categoryId}             // this value is for reset
//                                 onFocus={()=>handleError('','categoryId')}
//                                 >
//                                 {fillAllCategory()}
//                             </Select>   
//                         <FormHelperText>{errors.categoryId} </FormHelperText>                    
//                         </FormControl>
//                     </Grid>


//                     <Grid item xs={4}>
//                     <FormControl fullWidth   error={errors.brandId}>
//                             <InputLabel>Brand Id</InputLabel>
//                             <Select label='BrandId'  
//                             value={brandId}                     
//                                 onChange={fetchProductsByBrands}
//                                 onFocus={()=>handleError('','brandId')}>                         
//                                 {fillBrands()}
//                             </Select> 
//                             <FormHelperText>{errors.brandId} </FormHelperText>                          
//                         </FormControl>
//                     </Grid>


//                     <Grid item xs={4}>
//                     <FormControl fullWidth error={errors.productId}>
//                             <InputLabel>Product Id</InputLabel>
//                             <Select label='Product Id'
//                             value={productId}
//                             onChange={(event)=>setProductId(event.target.value)}
//                             onFocus={()=>handleError('','productId')}>
//                                 {fillProducts()}
//                             </Select>    
//                             <FormHelperText>{errors.productId} </FormHelperText>                          
                      
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='Model Number' fullWidth onChange={(event)=>setModelNumber(event.target.value)} value={modelNumber}
//                             onFocus={()=>handleError('','modelnumber')}
//                             error={errors.modelNumber}
//                             helperText={errors.modelNumber}/>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='Color' fullWidth onChange={(event)=>setColor(event.target.value)} value={color}
//                             onFocus={()=>handleError('','color')}
//                             error={errors.color}
//                             helperText={errors.color}/>
//                     </Grid>

//                     <Grid item xs={12} fullWidth>
//                       <FormControl fullWidth error={errors.description}>
//                         <FormLabel sx={{marginBottom:1}}>Description</FormLabel>
//                         <ReactQuill theme="snow"  placeholder="Enter Producct Description" onChange={(event)=>setDescription(event)} value={description}
//                         onFocus={()=>handleError('','description')}
//                         />
//                     <FormHelperText>{errors.description} </FormHelperText>                          
  
//                       </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='Price' fullWidth onChange={(event)=>setPrice(event.target.value)} value={price}
//                             onFocus={()=>handleError('','price')}
//                             error={errors.price}
//                             helperText={errors.price}/>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='Offer Price' fullWidth onChange={(event)=>setOfferPrice(event.target.value)} value={offerPrice}
//                             onFocus={()=>handleError('','offerprice')}
//                             error={errors.offerprice}
//                             helperText={errors.offerprice}/>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='Stock' fullWidth onChange={(event)=>setStock(event.target.value)} value={stock}
//                             onFocus={()=>handleError('','stock')}
//                             error={errors.stock}
//                             helperText={errors.stock}/>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <TextField label='HSN code' fullWidth onChange={(event)=>setHSNCode(event.target.value)} value={hsnCode}
//                             onFocus={()=>handleError('','hsnCode')}
//                             error={errors.hsnCode}
//                             helperText={errors.hsnCode}/>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl error={errors.status}>
//                             <FormLabel>Status</FormLabel>
//                             <RadioGroup row onChange={(event)=>setStatus(event.target.value)} value={status}>
//                             <FormControlLabel value="continue" label="Continue" control={<Radio />} />
//                             <FormControlLabel value="discontinue" label="Discontinue" control={<Radio />} 
//                             />
//                             </RadioGroup>
//                             <FormHelperText>{errors.status} </FormHelperText> 
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <FormControl error={errors.picture}>
//                             <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}
//                             onChange={handlePicture} 
//                             onFocus={()=>handleError('','picture')}
//                             error={errors.picture}>                            
//                             <input type="file" hidden accept="images/*" multiple  />
//                             Upload Image
//                             </Button>
//                             <FormHelperText>{errors.picture} </FormHelperText>                          

//                             </FormControl>
//                     </Grid>

//                     <Grid item xs={6} className={useStyle.center}>
//                             <Avatar src={picture.filename} />
//                     </Grid>

//                     <Grid item xs={6}>
//                             <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
//                     </Grid>

//                     <Grid item xs={6}>
//                             <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
//                     </Grid>

                    


//                 </Grid>

                
//             </div>
//         </div>
//     )
// }



//*********************************************************************************************************** */


import { Grid,Button,TextField,Avatar, FormLabel, RadioGroup,Radio } from "@mui/material"
import { makeStyles } from "@mui/styles"
import {FormControl,InputLabel,Select,MenuItem,FormControlLabel,FormHelperText} from "@mui/material";
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Heading from "./projectComponent/Heading"
import categoryicon from '../../src/assets/category.png'
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useMemo } from "react";
import {DropzoneArea} from 'material-ui-dropzone'



var useStates = makeStyles({
    root:{
        height:'100vh',
        width:'100vw',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      
        // overflow:'hidden'
        
    },
    box:{
        height:'100vh',
        width:'100vw',
        display:'flex',
        justifyContent:'center',
        background:'#f1f2f6',
        padding:10,
        borderRadius:10,
        margin:10,   
             
    },
    center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }

}) 



export default function ProductDetails(){
    var useStyle=useStates()

    const [categoryList,setCategoryList] = useState([])
    const [brandList,setBrandList] = useState([])
    const [productList,setProductList] = useState([])
    const [brandId,setBrandId] = useState('')
    const [productId,setProductId] = useState('')
    const [categoryId,setCategoryId] = useState('')
    const [modelNumber,setModelNumber] = useState('')
    const [color,setColor] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [offerPrice,setOfferPrice] = useState('')
    const [stock,setStock] = useState('')
    const [hsnCode,setHSNCode] = useState('')
    const [status,setStatus] = useState('')
    const [picture,setPicture] = useState({bytes:'',filename:''})
    const [errors,setErrors] = useState({})
    const [files,setFiles] = useState([])
    

    
    const fetchAllCategory= async ()=>{
        var response = await getData('category/display_all_category')
        setCategoryList(response.data)
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
    const fillBrandsByCategory= async (cid)=>{
            var response = await postData('brands/display_all_brands_by_category',{categoryid:cid})
            setBrandList(response.data)
    }
    const fillBrands=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const fetchProductsByBrands=(event)=>{      
        setBrandId(event.target.value)
        //setCategoryId(event.target.value)
        fillProductsByBrands(event.target.value)
    }
    // const fillProductsByBrands=async(cid,bid)=>{
    //     var body ={categoryid:cid,brandid:bid}
    //     var response = await postData('products/display_all_products_by_brands',body)
    //     setProductList(response.data)
    //     console.log('sssssssssss:',response.data)
    // }
    const fillProductsByBrands=async(bid)=>{
        var response = await postData('products/display_all_products_by_brands',{brandid:bid})
        setProductList(response.data)
        console.log('sssssssssss:',response.data)
    }
    const fillProducts=()=>{
        return productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link", "video"],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
          
        },
      }), [])

    const handlePicture=(event)=>{
        setPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleReset=()=>{
        setCategoryId('')
        setBrandId('')
        setProductId('')
        setModelNumber('')
        setColor('')
        setDescription('')
        setPrice('')
        setOfferPrice('')
        setStock('')
        setHSNCode('')
        setStatus('')
        setPicture({bytes:'',filename:''})
    }

    const handleSubmit= async()=>{
      var formData = new FormData()
      var error=validation()
        if(error===false){
        formData.append('categoryid',categoryId)
        formData.append('brandid',brandId)
        formData.append('productid',productId)
        formData.append('modelnumber',modelNumber)
        formData.append('color',color)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('offerprice',offerPrice)
        formData.append('stock',stock)
        formData.append('hsncode',hsnCode)
        formData.append('status',status)
        files.map((file,index)=>{
            formData.append('picture'+index,file)
        })
        

        var response = await postData('productdetails/submit_productdetails',formData)
        console.log('response:',response)
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'ProductDetails',
                text: response.message,
                toast:true
              })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'ProductDetails',
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
      var error=false
        if(categoryId.length===0){
            error=true
            handleError('Please input category id','categoryId')
        }
        if(brandId.length===0){
            error=true
            handleError('Please input brand id','brandId')
        }
        if(productId.length===0){
            error=true
            handleError('Please input product id','productId')
        }
        if(modelNumber.length===0){
            error=true
            handleError('Please input model number','modelNumber')
        }
        if(color.length===0){
            error=true
            handleError('Please input color','color')
        }
        if(description.length===0){
            error=true
            handleError('Please input description','description')
        }
        if(price.length===0){
            error=true
            handleError('Please input price','price')
        }
        if(offerPrice.length===0){
            error=true
            handleError('Please input offerprice','offerprice')
        }
        if(stock.length===0){
            error=true
            handleError('Please input stock','stock')
        }
        if(hsnCode.length===0){
            error=true
            handleError('Please input hsn code','hsnCode')
        }
        if(status.length===0){
            error=true
            handleError('Please input status','status')
        }
        if(files.length===0){
            error=true
            handleError('Please input picture','picture')
        }
        return error
    }
    

    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Add Product Details" link='/dashboard/displayallproductdetails'/>
                </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                    
                    

                    <Grid item xs={4}>
                        <FormControl fullWidth   error={errors.categoryId}>
                            <InputLabel>Category Id</InputLabel>
                            <Select label='Category Id'
                                onChange={fetchBrandsByCategory}
                                value={categoryId}             // this value is for reset
                                onFocus={()=>handleError('','categoryId')}
                                >
                                {fillAllCategory()}
                            </Select>   
                        <FormHelperText>{errors.categoryId} </FormHelperText>                    
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                    <FormControl fullWidth   error={errors.brandId}>
                            <InputLabel>Brand Id</InputLabel>
                            <Select label='BrandId'  
                            value={brandId}                     
                                onChange={fetchProductsByBrands}
                                onFocus={()=>handleError('','brandId')}>                         
                                {fillBrands()}
                            </Select> 
                            <FormHelperText>{errors.brandId} </FormHelperText>                          
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                    <FormControl fullWidth error={errors.productId}>
                            <InputLabel>Product Id</InputLabel>
                            <Select label='Product Id'
                            value={productId}
                            onChange={(event)=>setProductId(event.target.value)}
                            onFocus={()=>handleError('','productId')}>
                                {fillProducts()}
                            </Select>    
                            <FormHelperText>{errors.productId} </FormHelperText>                          
                      
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='Model Number' fullWidth onChange={(event)=>setModelNumber(event.target.value)} value={modelNumber}
                            onFocus={()=>handleError('','modelnumber')}
                            error={errors.modelNumber}
                            helperText={errors.modelNumber}/>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='Color' fullWidth onChange={(event)=>setColor(event.target.value)} value={color}
                            onFocus={()=>handleError('','color')}
                            error={errors.color}
                            helperText={errors.color}/>
                    </Grid>

                    <Grid item xs={12} fullWidth>
                      <FormControl fullWidth error={errors.description}>
                        <FormLabel sx={{marginBottom:1}}>Description</FormLabel>
                        <ReactQuill theme="snow" type="text" modules={modules}  placeholder="Enter Producct Description" onChange={(event)=>setDescription(event)} value={description}
                        onFocus={()=>handleError('','description')}
                        />
                    <FormHelperText>{errors.description} </FormHelperText>                          
  
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='Price' fullWidth onChange={(event)=>setPrice(event.target.value)} value={price}
                            onFocus={()=>handleError('','price')}
                            error={errors.price}
                            helperText={errors.price}/>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='Offer Price' fullWidth onChange={(event)=>setOfferPrice(event.target.value)} value={offerPrice}
                            onFocus={()=>handleError('','offerprice')}
                            error={errors.offerprice}
                            helperText={errors.offerprice}/>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='Stock' fullWidth onChange={(event)=>setStock(event.target.value)} value={stock}
                            onFocus={()=>handleError('','stock')}
                            error={errors.stock}
                            helperText={errors.stock}/>
                    </Grid>

                    <Grid item xs={6}>
                            <TextField label='HSN code' fullWidth onChange={(event)=>setHSNCode(event.target.value)} value={hsnCode}
                            onFocus={()=>handleError('','hsnCode')}
                            error={errors.hsnCode}
                            helperText={errors.hsnCode}/>
                    </Grid>

                    <Grid item xs={12}>
                        {/* <FormControl error={errors.status}>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup row onChange={(event)=>setStatus(event.target.value)} value={status}>
                            <FormControlLabel value="continue" label="Continue" control={<Radio />} />
                            <FormControlLabel value="discontinue" label="Discontinue" control={<Radio />} 
                            />
                            </RadioGroup>
                            <FormHelperText>{errors.status} </FormHelperText> 
                        </FormControl> */}

                            <FormControl fullWidth   error={errors.categoryId}>
                                <InputLabel>Status</InputLabel>
                                    <Select label='Status'
                                        onChange={(event)=>setStatus(event.target.value)}
                                        value={status}             // this value is for reset                                       
                                    >
                                        <MenuItem value={'Offer'}>Offer</MenuItem>
                                        <MenuItem value={'Deal of the day'}>Deal of the day</MenuItem>
                                        <MenuItem value={'Festive Deals'}>Festive Deals</MenuItem>
                                        <MenuItem value={'Trending'}>Trending</MenuItem>
                                        <MenuItem value={'Sale'}>Sale</MenuItem>
                                        <MenuItem value={'New Arrivals'}>New Arrivals</MenuItem>
                                        <MenuItem value={'Discontinue'}>Discontinue</MenuItem>
                                    </Select>   
                                <FormHelperText>{errors.categoryId} </FormHelperText>                    
                            </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                            <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>

                    <Grid item xs={6}>
                            <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
                    </Grid>

                    </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={3}>
                    

                    <Grid item xs={12}>
                        <FormControl error={errors.picture} style={{width:540}}>
                           <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Drag and drop an image here or click"}
                                onChange={(files) => setFiles(files)}
                                filesLimit={7}
                            />
                             {/* <Button variant="contained" fullWidth startIcon={<CloudUploadIcon />}
                            onClick={handlePicture} 
                            onFocus={()=>handleError('','picture')}
                            error={errors.picture}>                            
                            
                            Upload Image
                            </Button>  */}
                            <FormHelperText>{errors.picture} </FormHelperText>                          

                            </FormControl>
                    </Grid>

                   

                    

                    


                </Grid>

                </Grid>
                </Grid>

                
            </div>
        </div>
    )
}