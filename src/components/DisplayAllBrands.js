import { useState,useEffect } from "react"
import MaterialTable from "@material-table/core";
import { makeStyles } from  "@mui/styles";
import { getData, serverURL } from "../services/FetchNodeServices";
import { Button, DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";
import {Grid,TextField,Avatar} from "@mui/material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from "react-router-dom";
import categoryimg from '../../src/assets/category.png'
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";



var useStyles = makeStyles({
    reportroot:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center'
    },
    reportbox:{
        width:800,
        height:545,
        background:'#f1f2f6',
        padding:10,
        margin:10,
        borderRadius:10

    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        width:500,
        height:'auto',
        padding:10,
        margin:10,
        borderRadius:10

    },
    right:{
        display:'flex',
        justifyContent:'right',
        alignItems:'center'
    }
    
})



export default function DisplayAllBrands(){
    var classes = useStyles()
    var navigate=useNavigate()
    const[brands,setBrands]=useState([])
    const [open,setOpen]=useState(false)
    const [brandName,setBrandName] = useState('')
    const [logo,setLogo] = useState({bytes:"",filename:""})
    const [errors,setErrors] = useState({})
    const [statusCamera,setStatusCamera] = useState(false)
    const [statusBtn,setStatusBtn] = useState(false)
    const [tempPicture,setTempPicture]=useState('')
    const [brandId,setBrandId] = useState()
    const [categoryList,setCategoryList] = useState([])
    const [categoryId,setCategoryId] = useState('')
   
    
    


 
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


    const handleEditLogo = async () =>{
        setStatusBtn(false)
        var error = validation()
        if(error===false){
         var formData = new FormData()
         formData.append('brandid',brandId)
         formData.append('logo',logo.bytes)
         var response = await postData('brands/edit_brand_picture',formData)
         if(response.status){
             Swal.fire({
                 icon: 'success',
                 title: 'Brand',
                 text: response.message,
                 toast:true
               })
               fetchallbrands()
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
   


     const handleSubmit = async () =>{
        var error = validation()
        if(error===false){
         var body = {brandid:brandId,brandname:brandName}
         
         var response = await postData('brands/edit_brand_data',body)
         if(response.status){
             Swal.fire({
                 icon: 'success',
                 title: 'Brand',
                 text: response.message,
                 toast:true
               })
               fetchallbrands()
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
                 result = await postData('brands/delete_brands',{brandid:rowData.brandid})
                if(result.status){
              Swal.fire(
                'Deleted!',
                'Brand has been deleted.',
                'success'
              )
              fetchallbrands()
            }
           
        else{
            Swal.fire(
                'Deleted!',
                'Fail to delete brand',
                'error'
              )

        }}
          })
    }

     const handleError = (error,label) => {
        setErrors((prev)=>({...prev,[label]:error}))
    }


    const handleClose=()=>{
        setOpen(false)
    }


    const handleOpen=(rowData)=>{
        setBrandName(rowData.brandname)
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setLogo({filename:`${serverURL}/images/${rowData.logo}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.logo}`)
        setOpen(true)
    }


    const fetchallbrands = async()=>{
        var response = await getData('brands/display_all_brands')
        console.log('response:',response.data)
        setBrands(response.data)
    }

    useEffect(function(){
        fetchallbrands()
    },[])

    const showBrandsDialog=()=>{
            return (
                <Dialog open={open}>
                    <DialogTitle>
                        Update Brands
                    </DialogTitle>
                    <DialogContent>
                        {Brands()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}>Edit Data</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )
    }

    


    function displayBrands() {
        return (
          <MaterialTable
          title={<div style={{display:'flex',flexDirection:'row'}}>
          <div>
              <img alt="" src={categoryimg} width='25'/>
          </div>
          <div style={{fontFamily:'dosis',fontWeight:'bold',fontSize:18,paddingLeft:5}}>
              Brands List
          </div>
          </div>}
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Category Name', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div> },
              { title: 'Logo', render:(rowData)=><img src={`${serverURL}/images/${rowData.logo}`}width={45} alt=""/>},
              
            ]}
            data={brands}
              
            
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brands',
                onClick: (event, rowData) =>handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brands',
                onClick: (event, rowData) =>handleDelete(rowData)
              },
              {
                  icon: 'add',
                  tooltip: 'Add Brand',
                  isFreeAction: true,
                  onClick: (event) => navigate('/dashboard/brands')
                }
            ]}
          />
        )
      }

 
      console.log('brands:',brands)

    //***************Brands Edit Form ************************//


const Brands=()=>{
    var useStyle = useStyles()
    
   


    const handlelogo = (event) =>{
        setLogo({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
        setStatusBtn(true)
    }

    

    

   
    const SaveCancelBtn=()=>{
        return(<div>
            <Button onClick={handleEditLogo}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </div>)
    }

    const handleCancel=()=>{
        setStatusBtn(false)
        setLogo({filename:tempPicture,bytes:""})
    }
    return(                                              // this return is of function  Brands
    
        <div className={useStyle.box}>

            <Grid container spacing={3}>
            

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

                <Grid item xs={12} className={useStyle.right}> 
                  {statusBtn?<SaveCancelBtn />:<></> }                   
                        <Button component="label"  onFocus={()=>handleError('','logo')} style={{position:'relative'}} 
                        onMouseEnter={()=>setStatusCamera(true)}  onMouseLeave={()=>setStatusCamera(false)}>
                            {statusCamera?
                           <div style={{position:'absolute',zIndex:2,background:'white',width:30,height:30,borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center',bottom:5,right:8,padding:2}}>
                                <PhotoCameraIcon style={{color:'black'}}/>
                           </div>
                           :<></>}
                        <input hidden type="file" accept="images/*" multiple onChange={handlelogo}/>
                        <Avatar src={logo.filename} sx={{width:100,height:100}} alt="brand image" variant="rounded" />
                    </Button>
                    <div style={{color:'#d32f2f',fontSize:13,marginLeft:10,marginTop:6}}>{errors.logo}</div>
                </Grid>
               
                
            </Grid>
        </div>
        
    )
}

//**************************************************************************************//


    return(<div className={classes.reportroot}>
        <div className={classes.reportbox}>
       {displayBrands()}
       {showBrandsDialog()}
       </div>
    </div>)
}

