import {Grid,Button} from "@mui/material";
import { makeStyles } from  "@mui/styles";
import Heading from "./projectComponent/Heading";
import categoryicon from '../../src/assets/category.png'
import {DropzoneArea} from 'material-ui-dropzone'
import {FormControl,FormHelperText} from "@mui/material";
import {  useState } from "react";
import {  postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";







var useStyles = makeStyles({
    root:{
        width:'100%',
        height:'auto',
        display:'flex',
        justifyContent:'center'
    },
    box:{
        width:900,
        height:'auto',
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


export default function Banner(){
    var useStyle = useStyles()

    const [errors,setErrors] = useState({})
    const [files,setFiles] = useState([])


    const handleReset=()=>{
        setFiles([])
    }

    const handleSubmit= async()=>{
        var error=validation()
        if(error===false){
        var formData = new FormData()
          files.map((file,index)=>{
              formData.append('picture'+index,file)
          })
          
  
          var response = await postData('banners/submit_banners',formData)
          console.log('response:',response)
          if(response.status){
              Swal.fire({
                  icon: 'success',
                  title: 'Banner',
                  text: response.message,
                  toast:true
                })
          }
          else{
              Swal.fire({
                  icon: 'error',
                  title: 'Banner',
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
                    <Heading image={categoryicon} caption="New Banners" link=""/>
                </Grid>
                <Grid item xs={12}>
                        <FormControl error={errors.picture}  fullWidth>
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
        </div>
        </div>
    )
}