import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

const useStyles = makeStyles({
    home_root:{
        background:'#191919',
        height:'100vh',
        width:'100%',
        overflow:'auto',
                      
    },
    filter_by:{
        color:'#fff',   
        fontSize:'2.2vw%',
        marginTop:'20px',
        padding:'10px 0px 12px 0px'      
    },
    description_offer_pink_box:{
        border:'1px solid #ff02b9',
         fontSize:'0.7vw',
         fontWeight:'bold',
         color:'#ff02b9',
        //  margin:'1vw',
         padding:'2%',
         borderRadius:'0.4rem'
    },
    rightSpec_offer_box:{
        border:'1px solid #cffff3',
        color:'#088466',
        background:'#cffff3',
        fontSize:'0.8vw',
        fontWeight:'bold',
        
        margin:'0px 10px 4px 0px',
        padding:'8px 16px',
        borderRadius:'1rem'  
    },
    color_change_on_hover:{hover:{
        border:'1px solid #12daa8',
    }
        

    }
}) 
export {useStyles}