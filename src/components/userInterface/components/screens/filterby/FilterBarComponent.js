import { Grid } from "@mui/material"
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function FilterBarComponent(){
    return(
        <Grid container style={{height:'50px',position:'static'}} >
            <Grid item xs={6} style={{background:'#353535',color:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <SwapVertIcon />
                    SORT
            </Grid>
            <Grid item xs={6} style={{background:'#353535',color:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <FilterAltIcon />
                    FILTER
            </Grid>
        </Grid>
          
   )
}