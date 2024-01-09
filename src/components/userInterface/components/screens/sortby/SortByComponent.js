import { MenuItem, makeStyles } from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function SortByComponent(){
    return (<div>
       <div style={{color:'#fff',height:'5vh',width:'100%'}}>SORT BY</div>
        <Accordion style={{width:'100%',border:'2px solid #fff',background:'#191919',color:'#fff',borderRadius:'15px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  style={{color:"#fff"}}/>}       
        >
          <Typography>Featured </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem>Product</MenuItem>
          <MenuItem>Price(Lowest Price)</MenuItem>
          <MenuItem>Latest Arrival</MenuItem>
          <MenuItem>Price</MenuItem>
          <MenuItem>Top Rated</MenuItem>
          <MenuItem>Discount</MenuItem>
          <MenuItem>Featured</MenuItem>
        </AccordionDetails>
      </Accordion>
    </div>
    )
}