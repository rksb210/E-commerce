import { MenuItem, makeStyles } from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
    

export default function CategoryFilter(){
    return (<div>
        
        <Accordion style={{width:'100%',background:'#191919',color:'#fff', boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  style={{color:"#fff"}}/>}       
        >
          <Typography>Cateogries </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div><Checkbox size="large" sx={{color:'#fff'}} />Android </div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>iPhones</div>

        </AccordionDetails>
      </Accordion>
    </div>)
}