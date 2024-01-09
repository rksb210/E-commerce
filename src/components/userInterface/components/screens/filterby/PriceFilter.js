import { MenuItem, makeStyles } from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';


export default function PriceFilter(){
    return (<div>
        
        <Accordion style={{width:'100%',background:'#191919',color:'#fff', boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  style={{color:"#fff"}}/>}       
        >
          <Typography>Price </Typography>
        </AccordionSummary>
        <AccordionDetails>
            
          <div><Checkbox size="large" sx={{color:'#fff'}} />5001-10000 </div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>10001-15000</div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>15001-20000</div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>20001-30000</div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>30001-50000</div>
          <div><Checkbox size="large" sx={{color:'#fff'}}/>50001 +</div>

        </AccordionDetails>
      </Accordion>
    </div>)
}