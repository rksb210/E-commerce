import MaterialTable from "@material-table/core"
import { getData, serverURL,postData } from "../services/FetchNodeServices"
import { useState,useEffect } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Grid,Button,TextField,Avatar, FormLabel, RadioGroup,Radio } from "@mui/material"
import { makeStyles } from "@mui/styles"
import {FormControl,InputLabel,Select,MenuItem,FormControlLabel,FormHelperText} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Heading from "./projectComponent/Heading"
import categoryicon from '../../src/assets/category.png'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import categoryimg from '../../src/assets/category.png'
import {DropzoneArea} from 'material-ui-dropzone'




var useStates = makeStyles({
    root:{
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
    },
    box:{
        height:'auto',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        
        padding:10,
        borderRadius:10,
        marginTop:'2%',

    },
    center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    right:{
        display:'flex',
        justifyContent:'right',
        alignItems:'center'
    }

}) 




export default function DisplayAllProductDetails(){

    var useStyle=useStates()
    var navigate=useNavigate()

    const [categoryList,setCategoryList] = useState([])
    const [brandList,setBrandList] = useState([])
    const [productList,setProductList] = useState([])
    const [brandId,setBrandId] = useState('')
    const [productId,setProductId] = useState('')
    const [categoryId,setCategoryId] = useState('')
    const [productDetailsId,setProductDetailsId] =useState('')
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
    const [statusCamera,setStatusCamera]=useState(false)
    const [statusBtn,setStatusBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')

    const [productDetails,setProductDetails] = useState([])
    const [open,setOpen] = useState(false)
    const [openPicture,setOpenPicture] = useState(false)

    const [files,setFiles] = useState([])

    const fetchAllProductDetails = async ()=>{
        var response = await getData('productdetails/display_all_productdetails')
        setProductDetails(response.data)
    }
    useEffect(function(){
        fetchAllProductDetails()
    },[])

    const handleOpen=(rowData)=>{
        fillBrandsByCategory(rowData.categoryid)
        fillProductsByBrands(rowData.categoryid,rowData.brandid)
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductId(rowData.productid)
        setProductDetailsId(rowData.productdetailsid)
        setModelNumber(rowData.modelnumber)
        setColor(rowData.color)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setHSNCode(rowData.hsncode)
        setStatus(rowData.status)
        setPicture({filename:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)


    }

    const handleOpenPicture=(rowData)=>{
        setProductDetailsId(rowData.productdetailsid)
        var pictures = rowData.picture.split(",").map((item)=>{
            return `${serverURL}/images/${item}`
        })
        console.log('ppppppp:',pictures)
        console.log('kkk:',rowData.picture)
        setFiles(pictures)
        setOpenPicture(true)
    }
    const handleClose=()=>{
        setOpen(false)
        setOpenPicture(false)
      }

    const showProductDetailsDialog=()=>{
        return (<Dialog open={open}>
            <DialogTitle>
              Update Products
            </DialogTitle>
            <DialogContent>
             {productDetailsForm()}
            </DialogContent>
            <DialogActions>
                  <Button onClick={handleSubmit}>Edit Data</Button>
                  <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>)
        }


        const showPictureDetailsDialog=()=>{
            return (<Dialog open={openPicture}>
                <DialogTitle>
                  Update Products
                </DialogTitle>
                <DialogContent>
                <DropzoneArea 
                                acceptedFiles={['image/*' ]}
                                dropzoneText={"Drag and drop an image here or click"}
                                onChange={(files) => setFiles(files)}
                                filesLimit={7}
                                initialFiles={files}
                            />
                </DialogContent>
                <DialogActions>
                      <Button onClick={handleSubmit}>Edit Data</Button>
                      <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>)
            }

        //////////////////////////////////////////////
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
            fillProductsByBrands(event.target.value)
        }
        // const fillProductsByBrands=async(cid,bid)=>{
        //     var body ={categoryid:cid,brandid:bid}
        //     var response = await postData('products/display_all_products_by_brands',body)
        //     setProductList(response.data)
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
    
        const handlePicture=(event)=>{
            setPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
            setStatusBtn(true)
        }
    
       
    
        const handleSubmit = async () => {
        var error = validation()
        if (error === false) {
            setOpen(false)
            var body = { categoryid: categoryId, brandid: brandId, productid: productId, modelnumber: modelNumber, color: color, description: description, price: price, offerprice: offerPrice, stock: stock, hsncode: hsnCode, status: status, productdetailsid: productDetailsId }
            var response = await postData('productdetails/edit_productdetails_data', body)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: response.data,
                    text: response.message,
                    toast: true
                })
                fetchAllProductDetails()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: response.data,
                    text: response.message,
                    toast: true
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
            if(picture.filename.length===0){
                error=true
                handleError('Please input picture','picture')
            }
            return error
        }
        
    
        ////////////////////////////////////////////////

        const SaveCancelBtn=()=>{
            return(<div>
                <Button onClick={handleEditPicture}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>)
        }

        
 const handleEditPicture = async () =>{
      setStatusBtn(false)
      var error = validation()
      if(error===false){
       var formData = new FormData()     
       formData.append('picture',picture.bytes)
       formData.append('productdetailsid',productDetailsId)
       var response = await postData('productdetails/edit_productdetails_picture',formData)
       console.log('response:',response)
       if(response.status){
           Swal.fire({
               icon: 'success',
               title: 'ProductDetails',
               text: response.message,
               toast:true
             })
             fetchAllProductDetails()
        } 
        else{
           Swal.fire({
               icon: 'error',
               title: 'Product',
               text: response.message,
               toast:true
             })
        }
      }
   
        }
    
        const handleCancel=()=>{
            setStatusBtn(false)
            setPicture({filename:tempPicture,bytes:''})
        }
        
        const handleDelete = (rowData) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    var response = await postData('productdetails/delete_productdetails', { productdetailsid: rowData.productdetailsid})
                    if (response.status) {
                        Swal.fire(
                            'Deleted!',
                            'Your Record has been deleted.',
                            'success'
                        )
                        fetchAllProductDetails()
                    }
                    else {
                        Swal.fire(
                            'Failed!',
                            'Your Record has not been deleted.',
                            'error'
                        )
                    }
                }
            })
        }
    
    function displayProductDetails(){
        
            return (
              <MaterialTable
              title={<div style={{display:'flex',flexDirection:'row'}}>
              <div>
                  <img alt="" src={categoryimg} width='25'/>
              </div>
              <div style={{fontFamily:'dosis',fontWeight:'bold',fontSize:18,paddingLeft:5}}>
                  Product Details List
              </div>
              </div>}
                columns={[
                    { title: 'Category Name', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div> },
                    { title: 'Brand Name', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
                    { title: 'Product Name', render:(rowData)=><div>{rowData.productid}/{rowData.productname}</div> },
                    { title: 'Model Number', field:'modelnumber'},
                    { title: 'Color', field:'color'},
                    { title: 'Description', field:'description'},
                    { title: 'Price', render:(rowData)=><s>{rowData.price}</s>},
                    { title: 'OfferPrice', field:'offerprice'},
                    { title: 'Stock', field:'stock'},
                    { title: 'hsn Code', field:'hsncode'},
                    { title: 'Status', field:'status'},
                   
                ]}
                data={productDetails}
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit Product Details',
                    onClick: (event, rowData) => handleOpen(rowData)
                  },
                  {
                    icon: 'photooutlined',
                    tooltip: 'Edit Picture',
                    onClick: (event, rowData) => handleOpenPicture(rowData)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Delete Product Details',
                    onClick: (event, rowData) => handleDelete(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add ProductDetails',
                    isFreeAction: true,
                    onClick: (event) => navigate('/dashboard/productdetails')
                  }
                ]}
              />
            )
    }

    const productDetailsForm=()=>{
        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={3}>
    
                    <Grid item xs={12}>
                        <Heading image={categoryicon} caption="Add Product Details" link='/displayallproductdetails'/>
                    </Grid>
    
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
                            <ReactQuill theme="snow"  placeholder="Enter Producct Description" onChange={(event)=>setDescription(event)} value={description}
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
                            <FormControl error={errors.status}>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup row onChange={(event)=>setStatus(event.target.value)} value={status}>
                                <FormControlLabel value="continue" label="Continue" control={<Radio />} />
                                <FormControlLabel value="discontinue" label="Discontinue" control={<Radio />} 
                                />
                                </RadioGroup>
                                <FormHelperText>{errors.status} </FormHelperText> 
                            </FormControl>
                        </Grid>

    
                        {/* <Grid item xs={12} className={useStyle.right}>
                        {statusBtn?<SaveCancelBtn />:<></>}
                        <FormControl error={errors.picture}> 
                            <Button component='label' style={{position:'relative'}}
                            onMouseEnter={()=>setStatusCamera(true)} onMouseLeave={()=>setStatusCamera(false)}>
                                <input type="file" hidden accept="images/*" multiple 
                                onChange={handlePicture}  onFocus={()=>handleError('','picture')}
                                 />
                                {statusCamera?
                                    <div style={{position:'absolute',zIndex:2,background:'white',width:30,height:30,borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center',bottom:5,right:8,padding:2}}>
                                        <PhotoCameraIcon style={{color:'black'}}/>
                                    </div>
                                :<></>} 
                                <Avatar src={picture.filename} sx={{width:100,height:100}}/>                                
                            </Button>
                            </FormControl>
                        </Grid> */}
        
                    </Grid>
    
                    
                </div>
            </div>
        )
    }

    return (<div>
        {displayProductDetails()}
        {showProductDetailsDialog()}
        {showPictureDetailsDialog()}
        </div>
    )
    }
