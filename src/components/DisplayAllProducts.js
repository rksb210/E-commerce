import MaterialTable from "@material-table/core"
import { useState,useEffect } from "react"
import { makeStyles } from "@mui/styles"
import { getData,postData } from "../services/FetchNodeServices"
import { serverURL } from "../services/FetchNodeServices"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Grid,TextField, Avatar,FormHelperText } from "@mui/material"
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import Swal from "sweetalert2"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from "react-router-dom"
import categoryimg from '../../src/assets/category.png'
import { CleaningServices } from "@mui/icons-material"



var useStyles=makeStyles({
    reportroot:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center'
    },
    reportbox:{
        width:900,
        height:490,
        background:'#f1f2f6',
        padding:10,
        borderRadius:10,
        margin:10
    },
    center:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:100,
        width:100
    },
      root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
    },
    box:{
        width:500,
        height:'auto',
        padding:10,
        borderRadius:10,
        margin:10
    }, 
    right:{
      display:'flex',
      justifyContent:'right',
      alignItems:'center'
  }
  })




export default function DisplayAllProducts(){
    var useStyle=useStyles()
    var navigate=useNavigate()

    const [products,setProducts]=useState([])
    const [open,setOpen]=useState(false)
    const [categoryId,setCategoryId] = useState('')
    const [brandId,setBrandId] = useState('')
    const [productId,setProductId] = useState('')
    const [categoryList,setCategoryList] = useState([]) 
    const [brandList,setBrandList] = useState([])    
    const [productName,setProductName] = useState('')
    const [picture,setPicture] = useState({bytes:'',filename:''})
    const [errors,setErrors] = useState({})  
    const [statusCamera,setStatusCamera]=useState(false)
    const [statusBtn,setStatusBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')


    const fetchallproducts= async ()=>{
        var response = await getData('products/display_all_products')
        console.log('response',response)
        setProducts(response.data)
    }

    useEffect(function(){
        fetchallproducts()
    },[])

    const fetchAllCategory= async ()=>{
      var result = await getData('category/display_all_category')
      setCategoryList(result.data)
   }

   useEffect(function(){
     fetchAllCategory()
 },[])

    

    const handleOpen=(rowData)=>{
      fillBrandsByCategory(rowData.categoryid)
      setCategoryId(rowData.categoryid)
      setBrandId(rowData.brandid)
      setProductId(rowData.productid)
      setProductName(rowData.productname)
      setPicture({filename:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
      setOpen(true)
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

    const handleEditPicture = async () =>{
      setStatusBtn(false)
      var error = validation()
      if(error===false){
       var formData = new FormData()
       
       formData.append('picture',picture.bytes)
       formData.append('productid',productId)
       var response = await postData('products/edit_product_picture',formData)
       console.log('response:',response)
       if(response.status){
           Swal.fire({
               icon: 'success',
               title: 'Product',
               text: response.message,
               toast:true
             })
             fetchallproducts()
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

   const handleSubmit = async () =>{
    var error = validation()
    if(error===false){
     var body = {productid:productId,productname:productName}
     
     var response = await postData('products/edit_product_data',body)
     if(response.status){
         Swal.fire({
             icon: 'success',
             title: 'Product',
             text: response.message,
             toast:true
           })
           fetchallproducts()
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

 const handleDelete =(rowData)=>{
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
           result = await postData('products/delete_products',{productid:rowData.productid})
          if(result.status){
        Swal.fire(
          'Deleted!',
          'Product has been deleted.',
          'success'
        )
        fetchallproducts()
      }
     
  else{
      Swal.fire(
          'Deleted!',
          'Fail to delete product',
          'error'
        )

  }}
    })
}

      const handleError=(error,label)=>{
        setErrors((prev)=>({...prev,[label]:error}))
      }

      const handleClose=()=>{
        setOpen(false)
      }


    const showProductsDialog=()=>{
      return (<Dialog open={open}>
        <DialogTitle>
          Update Products
        </DialogTitle>
        <DialogContent>
         {productsForm()}
        </DialogContent>
        <DialogActions>
              <Button onClick={handleSubmit}>Edit Data</Button>
              <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>)
    }

      const handleCancel=()=>{
        setStatusBtn(false)
        setPicture({filename:tempPicture,bytes:''})
        
      }

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
        setStatusBtn(true)
    }


    const SaveCancelBtn=()=>{
      return(<div>
          <Button onClick={handleEditPicture}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
      </div>)
  }

  function displayProducts() {
    return (
      <MaterialTable
      title={<div style={{display:'flex',flexDirection:'row'}}>
      <div>
          <img alt="" src={categoryimg} width='25'/>
      </div>
      <div style={{fontFamily:'dosis',fontWeight:'bold',fontSize:18,paddingLeft:5}}>
          Products List
      </div>
      </div>}
        columns={[
          { title: 'Category Name', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div> },
          { title: 'Brand Name', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
          { title: 'Product Name', field: 'productname' },
          { title: 'Picture', render:(rowData)=><img src={`${serverURL}/images/${rowData.picture}`}width={45} alt=""/>},              
        ]}
        data={products}
                
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Products',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Products',
            onClick: (event, rowData) =>handleDelete(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Products',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/products')
          }
        ]}
      />
    )
  }
    

   

    
    

////////////////////////////////////////////////////////////////////////////////////////////
    const productsForm=()=>{
      return(
        <div className={useStyle.root}>
          <div className={useStyle.box}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControl fullWidth error={errors.categoryId}>
                        <InputLabel >Category</InputLabel>
                        <Select
                        value={categoryId}
                        label="Category"
                        onChange={fetchBrandsByCategory}                       
                        error={errors.categoryId}
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

                <Grid item xs={12} className={useStyle.right}>
                  {statusBtn?<SaveCancelBtn />:<></>}
                    <FormControl error={errors.picture}>                    
                    <Button component='label' fullWidth style={{position:'relative'}}
                       onMouseEnter={()=>setStatusCamera(true)} onMouseLeave={()=>setStatusCamera(false)}>
                        <input type="file" hidden accept="images/*" multiple 
                        onChange={handlePicture}  onFocus={()=>handleError('','picture')}
                        />
                        {statusCamera?
                          <div style={{position:'absolute',zIndex:2,background:'white',width:30,height:30,borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center',bottom:5,right:8,padding:2}}>
                            <PhotoCameraIcon style={{color:'black'}}/>
                          </div>
                        :<></>}                       
                      <Avatar src={picture.filename}  alt="Product" sx={{width:100,height:100}}/>                   
                      </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    </div>)
}

    return <div className={useStyle.reportroot}>
             <div className={useStyle.reportbox}>
                {displayProducts()}
                {showProductsDialog()}
             </div>
           </div>
}

