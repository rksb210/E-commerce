import {Grid,Button,Card} from "@mui/material";
import { makeStyles } from  "@mui/styles";
import Heading from "./projectComponent/Heading";
import categoryicon from '../../src/assets/category.png'
import {DropzoneArea} from 'material-ui-dropzone'
import {FormControl,InputLabel,Select,MenuItem,FormControlLabel,FormHelperText} from "@mui/material";
import {  useState,useEffect } from "react";
import {  postData, getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";







var useStyles = makeStyles({
    root:{
        width:'100%',
        height:'auto',
        display:'flex',
        justifyContent:'center'
      
    },
    box:{
        width:750,
        height:450,
        
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


export default function CategoryBanners(){
    var useStyle = useStyles()

    const [errors,setErrors] = useState({})
    const [files,setFiles] = useState([])
    const [categoryList,setCategoryList] = useState([])
    const [categoryId,setCategoryId] = useState('')
    const [brandList,setBrandList] = useState([])
    const [brandId,setBrandId] = useState('')





    const handleReset=()=>{
        setFiles([])
    }

    const handleSubmit= async()=>{
        
        var error=validation()
        
        if(error===false){
        var formData = new FormData()
        formData.append('categoryid',categoryId)
        formData.append('brandid',brandId)
          files.map((file,index)=>{
              formData.append('picture'+index,file)
          })
          
  
          var response = await postData('categorybanners/submit_categorybanners',formData)
          if(response.status){
              Swal.fire({
                  icon: 'success',
                  title: ' Category Banner',
                  text: response.message,
                  toast:true
                })
          }
          else{
              Swal.fire({
                  icon: 'error',
                  title: 'Category Banner',
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
        if(files.length===0){
            error=true
            handleError('Please input picture','picture')
        }
        return error
    }

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


    return (
            <div className={useStyle.root}>
              <Card className={useStyle.box} sx={{background:'#f1f2f6'}}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading image={categoryicon} caption="Add Category Banner" link=""/>
                </Grid>

                <Grid item xs={6}>
                        <FormControl fullWidth error= {errors.categoryId} >
                            <InputLabel>Category Id</InputLabel>
                            <Select label='Category Id'
                                onChange={fetchBrandsByCategory}
                                onFocus={()=>handleError('','categoryId')}
                                >
                                {fillAllCategory()}
                            </Select>   
                        <FormHelperText>{errors.categoryId} </FormHelperText>                    
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                    <FormControl fullWidth  error={errors.brandId} >
                            <InputLabel>Brand Id</InputLabel>
                            <Select label='BrandId'  
                                onFocus={()=>handleError('','brandId')}
                                onChange={(event)=>setBrandId(event.target.value)}>                         
                                {fillBrands()}
                            </Select> 
                            <FormHelperText>{errors.brandId} </FormHelperText>                          
                        </FormControl>
                    </Grid>


                <Grid item xs={12}>
                        <FormControl error={errors.picture} fullWidth>
                           <DropzoneArea
                                acceptedFiles={['image/*']}
                                dropzoneText={"Drag and drop an image here or click"}
                                onChange={(files) => setFiles(files)}
                                filesLimit={7}
                                onFocus={()=>handleError('','picture')}
                                
                            />                           
                            <FormHelperText>{errors.picture} </FormHelperText>                          
                            </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                            <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>

                    <Grid item xs={6}>
                            <Button fullWidth variant="contained" onClick={handleReset}>Reset</Button>
                    </Grid>
  </Grid>
        </Card>
        </div>
    )
}