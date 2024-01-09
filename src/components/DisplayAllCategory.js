import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react"
import { postData, serverURL } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getData } from "../services/FetchNodeServices";
import { DialogActions, DialogContent, DialogTitle , Dialog} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from "react-router-dom";
import categoryimg from '../../src/assets/category.png'

var useStyles = makeStyles({
    reportroot:{
        width:'100%',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        
    },
    reportbox:{
        width:800,
        height:530,
        background:'#f1f2f6',
        padding:10,
        margin:10,
        borderRadius:10,
        overflow:'auto'
        
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    right:{
        display:'flex',
        justifyContent:'right',
        alignItems:'center'
    },
    box:{
        width:500,
        height:'auto',
        padding:10,
        margin:10,
        borderRadius:10
    },

})






    
function DisplayAllCategory(){
    var classes=useStyles()
    var navigate = useNavigate()
    const [category,setCategory]=useState([])

 ////////////////////////////////////////////////////
 
    const [categoryId,setCategoryId] = useState('')
    const [categoryName,setCategoryName] = useState('')
    const [image,setImage] = useState({bytes:'',filename:''})
    const [errors,setErrors] = useState({})
    const [statusCamera,setStatusCamera] = useState(false)
    const [statusBtn,setStatusBtn] = useState(false)
    const [tempPicture,setTempPicture] = useState('')



    const handleReset = ()=>{
        setCategoryName('')
        setImage({bytes:'',filename:''})
    }

    const handleError = (error,label)=>{
        setErrors((prev)=>({...prev,[label]:error}))
    }

    const validation=()=>{
        var error=false

        if(categoryName.length===0){
            error=true
            handleError('Pls Input Category Name..','categoryName')
        }
        if(image.filename.length===0){
            error=true
            handleError('Pls Select image...','image')  
        }
        return error
    }

    const handleImage=(event)=>{
        setImage({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
        setStatusBtn(true)
    }

    const handleSubmit = async ()=>{
        var error = validation()
            if(error===false){
       
         var body={categoryid:categoryId,categoryname:categoryName}

         var response = await postData('category/edit_category_data',body)       
         if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'category',
                text: response.message,
                toast:true
              })
              fetchAllCategory()
         } 
         else{
            Swal.fire({
                icon: 'error',
                title: 'category',
                text: response.message,
                toast:true
              })
         }
            }

    }


    const handleEditPicture = async ()=>{
        setStatusBtn(false)
        var error = validation()
            if(error===false){
       
         var formData=new FormData()
         formData.append('categoryid',categoryId)
         formData.append('image',image.bytes)

         var response = await postData('category/edit_category_picture',formData)       
         if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'category',
                text: response.message,
                toast:true
              })
              fetchAllCategory()
         } 
         else{
            Swal.fire({
                icon: 'error',
                title: 'category',
                text: response.message,
                toast:true
              })
         }
            }

    }

    const SaveCancelBtn = ()=>{
        return(<div>
        <Button onClick={handleEditPicture}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        </div>
        )
    }

    const handleCancel=()=>{
        setStatusBtn(false)
        setImage({filename:tempPicture,bytes:''})

    }

    const categoryForm = ()=>{
    return (
        
            <div className={classes.box}>
                <Grid container spacing={3}>

                
                <Grid item xs={12} className={classes.right}>
                {statusBtn?<SaveCancelBtn />:<></>}
                <Button component='label' onMouseEnter={()=>setStatusCamera(true)} onMouseLeave={()=>setStatusCamera(false)}
                        style={{position:'relative'}}
                        onFocus={()=>handleError('','image')}>
                            {statusCamera?
                            <div style={{position:'absolute',zIndex:2,background:'white',width:30,height:30,borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center',bottom:5,right:8,padding:2}}>
                            <PhotoCameraIcon style={{color:'black'}}/>
                            </div>
                            :<></>}
                            <input hidden onChange={(handleImage)} type="file" accept="images/*"/>
                            <Avatar style={{width:100,height:100}} src={image.filename} alt="Category Name" variant="rounded"/>
                        </Button>
                        <div style={{color:'#d32f2f',fontSize:13,marginLeft:10,marginTop:6}}>{errors.image}</div>
                        
                    </Grid>

                    <Grid item xs={12}>                     
                        <TextField 
                        value={categoryName}
                        onFocus={()=>handleError('','categoryName')}
                        error={errors.categoryName}
                        helperText={errors.categoryName}
                         onChange={(event)=>setCategoryName(event.target.value)} label='Category Name' fullWidth />
                    </Grid>

                    

                    


                </Grid>

            </div>

      
    )
}
 ///////////////////////////////////////////////////////////////////////////////
    const fetchAllCategory = async ()=>{
        var response = await getData('category/display_all_category')
        setCategory(response.data)
    }
    useEffect(function(){
        fetchAllCategory()
    },[])

    const [open,setOpen] = useState(false)

    const handleClose =()=>{
        setOpen(false)
    }
    const showCategoryDialog = ()=>{
        return(
            <Dialog open={open}>
                <DialogTitle>
                    Update Category
                </DialogTitle>
                <DialogContent>              
                    {categoryForm()}               
                </DialogContent>
                <DialogActions>
                     <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleSubmit}>Edit Data</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
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
                 result = await postData('category/delete_category',{categoryid:rowData.categoryid})
                if(result.status){
              Swal.fire(
                'Deleted!',
                'Category has been deleted.',
                'success'
              )
              fetchAllCategory()
            }
           
        else{
            Swal.fire(
                'Deleted!',
                'Fail to delete category',
                'error'
              )

        }}
          })
    }

    const handleOpen = (rowData)=>{
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)   // this category name is from database
        setImage({filename:`${serverURL}/images/${rowData.image}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.image}`)
        setOpen(true)
    }

        function displayCategory() {
                return (
                    <MaterialTable
                    title={<div style={{display:'flex',flexDirection:'row'}}>
                    <div>
                        <img alt="" src={categoryimg} width='25'/>
                    </div>
                    <div style={{fontFamily:'dosis',fontWeight:'bold',fontSize:18,paddingLeft:5}}>
                        Category List
                    </div>
                    </div>}
                    columns={[
                        { title: 'CategoryId', field: 'categoryid' },
                        { title: 'CategoryName', field: 'categoryname' },
                        { title: 'Image', render:(rowData)=><img alt="" src={`${serverURL}/images/${rowData.image}`} width='40'/> }
                        
                    ]}
                    data={category}
                        

                           
                    actions={[
                        {
                        icon: 'edit',
                        tooltip: 'Edit category',
                        onClick: (event, rowData) => handleOpen(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete category',
                            onClick: (event, rowData) => handleDelete(rowData)
                            },
                            {
                                icon: 'add',
                                tooltip: 'Add Category',
                                isFreeAction: true,
                                onClick: (event) => navigate('/dashboard/category')
                              }
                    ]}
                    />
                )
                }
        return(
            <div className={classes.reportroot}>
                <div className={classes.reportbox}>
                {displayCategory()}
                {showCategoryDialog()}
                </div>
            </div>
        )
   
}

export { DisplayAllCategory }