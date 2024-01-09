import { useStyles } from "../ProjectCss"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function FilterByComponent(){
    var classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));
    return (
            <div>
               
              <div className={classes.filter_by}>Filter By</div>
              <div><hr width='100%' align='left' size='1' color='#9a9a9a' /></div>

                
             <div><CategoryFilter /></div>
              <div><PriceFilter /></div>
    
           </div>)
    
}